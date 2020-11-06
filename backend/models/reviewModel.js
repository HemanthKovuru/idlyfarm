const mongoose = require("mongoose");
const Item = require("./itemModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please provide a review"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "Please provide a item."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// indexes
reviewSchema.index({ item: 1, user: 1 }, { unique: true });

// populate user and item in review
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname lastname",
  });
  next();
});

// calculate average rating
reviewSchema.statics.calculateAverageRating = async function (itemId) {
  const stats = await this.aggregate([
    {
      $match: { item: itemId },
    },
    {
      $group: {
        _id: "$item",
        nofRatings: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Item.findByIdAndUpdate(itemId, {
      numberOfRatings: stats[0].nofRatings,
      averageRating: stats[0].averageRating,
    });
  } else {
    await Item.findByIdAndUpdate(itemId, {
      numberOfRatings: 0,
      averageRating: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.item);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  console.log(this.r);
  await this.r.constructor.calculateAverageRating(this.r.item);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
