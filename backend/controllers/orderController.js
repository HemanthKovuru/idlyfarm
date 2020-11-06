const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncError = require("../utils/asyncError");
const GlobalError = require("../utils/globalError");
const Order = require("./../models/orderModel");
const factory = require("./handlerFactory");

exports.createOrder = factory.createOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);

exports.updatePaymentOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new GlobalError("Order item not found", 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_item: req.body.update_item,
    email_address: req.body.email_address,
  };
  const updatedOrder = await Order.save();

  res.status(200).json({ status: "success", data: { updatedOrder } });
});

exports.checkoutSession = asyncError(async (req, res, next) => {
  // corder
  const order = await Order.findById(req.params.orderId);

  const items = order.orderItems.map((item) => {
    return {
      name: item.name,
      amount: item.price * 100,
      images: [
        `https://idlyfarm.herokuapp.com/images/idlyfarm/${item.coverImage}`,
      ],
      currency: "inr",
      quantity: item.nofItems,
    };
  });

  // create the session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:3000`,
    cancel_url: `${req.protocol}://localhost:3000/cart`,
    customer_email: order.user.email,
    client_reference_id: req.params.order_id,
    line_items: items,
  });

  // send the response
  res.status(200).json({
    status: "success",
    session,
  });
});
