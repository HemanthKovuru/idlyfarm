const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);
router.post("/forgotpassword", authController.forogotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

// allow below routes through login
router.use(authController.access);

router.patch("/updatemypassword", authController.updatePassword);
router.patch(
  "/updateme",
  userController.uploadProfilePhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteme", authController.access, userController.deleteMe);
router.get("/me", userController.getMe, userController.getUser);

// restrict to admin
router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
