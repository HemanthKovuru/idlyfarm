const express = require("express");
const authController = require("./../controllers/authController");
const orderController = require("./../controllers/orderController");

const router = express.Router();

router.use(authController.access);

router
  .route("/")
  .post(orderController.createOrder)
  .get(orderController.getAllOrders);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.get("/checkout-session/:orderId", orderController.checkoutSession);

module.exports = router;
