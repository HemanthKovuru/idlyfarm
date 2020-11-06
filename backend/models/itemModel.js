const mongoose = require("mongoose");
const slugify = require("slugify");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a item name."],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide a item price"],
  },
  averageRating: {
    type: Number,
    default: 4.5,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  coverImage: {
    type: String,
    required: [true, "Please provide a cover image."],
  },
  type: {
    type: String,
    required: [true, "Please provide a item type"],
  },
});

const Item = mongoose.model("Item", itemSchema);

// virtual reviews
itemSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "item",
  localField: "_id",
});

// improving read performance
itemSchema.index({ price: 1, averageRating: -1 });
itemSchema.index({ slug: 1 });

// documant middleware
itemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = Item;
