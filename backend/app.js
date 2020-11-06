const express = require("express");
const rateLimit = require("express-rate-limit");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");

const globalErrorHandler = require("./controllers/errorController");
const GlobalError = require("./utils/globalError");
const itemRouter = require("./routes/itemRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");
const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// helemt
app.use(helmet());
// body parser
app.use(express.json());
app.use(cookieParser());

// static files
app.use(express.static(`${__dirname}/public`));

// rate limiter
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 69 * 1000,
  message: "Too many request. Try again after one hour.",
});
app.use(limiter);

// data sanitization against nosql query
app.use(mongosanitize());

// data sanitization against xss
app.use(xss());

// compression requests
app.use(compression());

// routes
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.all("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// unhandled routes
app.all("*", (req, res, next) => {
  next(new GlobalError(`url ${req.originalUrl} not found`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
