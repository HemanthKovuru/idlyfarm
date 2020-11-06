const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");

exports.addItemUserId = (req, res, next) => {
  if (!req.body.item) req.body.item = req.params.itemId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updatereview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
