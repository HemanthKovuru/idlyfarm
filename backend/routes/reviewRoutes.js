const express = require("express");
const authController = require("./../controllers/authController");
const reviewController = require("./../controllers/reviewController");
const router = express.Router({ mergeParams: true });

// only login users can create reviews
router.use(authController.access);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo("user"),
    reviewController.addItemUserId,
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updatereview
  )
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
