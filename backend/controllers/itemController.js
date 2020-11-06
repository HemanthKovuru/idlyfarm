const Item = require("./../models/itemModel");

const factory = require("./handlerFactory");

exports.getAllitems = factory.getAll(Item);
exports.getItem = factory.getOne(Item, { path: "reviews" });
exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
