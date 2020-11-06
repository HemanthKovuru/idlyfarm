const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const asyncError = require("./../utils/asyncError");
const GlobalError = require("./../utils/globalError");
const sendEmail = require("./../utils/email");

// create token
const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// create and send token
const sendToken = (user, statusCode, res) => {
  const token = getToken(user._id);

  let cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN + 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
// signup
exports.signup = asyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    photo,
    email,
    password,
    confirmPassword,
    role,
    passwordResetToken,
    passwordResetExpires,
  } = req.body;

  const user = await User.create({
    firstname,
    lastname,
    email,
    photo,
    password,
    confirmPassword,
    role,
    passwordResetToken,
    passwordResetExpires,
  });

  // send response and token
  sendToken(user, 200, res);
});

// signin
exports.signin = asyncError(async (req, res, next) => {
  // check if there is email and password
  const { password, email } = req.body;
  if (!password || !email) {
    return next(new GlobalError("Please provide email and password"));
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new GlobalError("Incorrect  email or password"));
  }
  // send token
  sendToken(user, 200, res);
});

// signout
exports.signout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      status: "success",
      message: "Logged out successfull",
    });
  } catch (err) {
    return next(new AppError("logout failed", 400));
  }
};

exports.access = asyncError(async (req, res, next) => {
  // 1). check if there is a token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new GlobalError("Please login to get access.", 401));
  }
  // 2). verify jwt
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3). check if user exists
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new GlobalError("user no longer exist.", 401));
  }

  // 4). check if the user changed password after the token has issued
  if (user.checkPassAfterToken(decoded.iat)) {
    return next(
      new GlobalError(
        "User recently changed password. Please login again.",
        401
      )
    );
  }

  // grant access
  req.user = user;
  next();
});

// restrictTo
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new GlobalError("Access to route is denied.", 403));
    }
    next();
  };
};

// forgot password
exports.forogotPassword = asyncError(async (req, res, next) => {
  // 1.) get user based on the posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new GlobalError("No user found with that email id.", 404));
  }

  // 2.) generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3). send it user's mail
  const reseturl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${resetToken}`;
  const message = `if you forgot your password submit your new password and confirm password to: ${reseturl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "password reset token valid only 10 min",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new GlobalError("Error sending the email", 500));
  }
  next();
});

// reset password
exports.resetPassword = asyncError(async (req, res, next) => {
  // 1). get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2). if token has not expired and there is user set new password
  if (!user) {
    return next(new GlobalError("Invalid token or token has expired", 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3). update the changedPasswordAt for the user

  // 4). log the user in and send the token
  sendToken(user, 200, res);
});

// update password
exports.updatePassword = asyncError(async (req, res, next) => {
  // 1). get user from collection

  const { currentPassword, password, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  // 2). check if posted current password is correct
  const correct = await user.checkPassword(currentPassword, user.password);
  if (!correct) {
    return next(new GlobalError("current password is incorrect", 401));
  }

  // 3). update password
  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  // 4). login

  const token = getToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
