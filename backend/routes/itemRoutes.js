const express = require("express");
const itemController = require("./../controllers/itemController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./reviewRoutes");
const router = express.Router();

router.use("/:itemId/reviews", reviewRouter);

router.route(
  "/:itemId/reviews",
  authController.access,
  reviewRouter.getAllitems
);

router
  .route("/")
  .get(itemController.getAllitems)
  .post(
    authController.access,
    authController.restrictTo("admin"),
    itemController.createItem
  );
router
  .route("/:id")
  .get(itemController.getItem)
  .patch(
    authController.access,
    authController.restrictTo("admin"),
    itemController.updateItem
  )
  .delete(
    authController.access,
    authController.restrictTo("admin"),
    itemController.deleteItem
  );

module.exports = router;
