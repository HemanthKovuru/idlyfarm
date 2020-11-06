const resourceFilter = require("./../utils/resourceFilter");
const asyncError = require("./../utils/asyncError");
const GlobalError = require("./../utils/globalError");

exports.getAll = (Model) =>
  asyncError(async (req, res, next) => {
    // only for review
    let filter = {};
    if (req.params.itemId) filter = { item: req.params.itemId };

    const features = new resourceFilter(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const doc = await features.resource;

    res.status(200).json({
      status: "success",
      data: {
        results: doc.length,
        data: {
          doc,
        },
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  asyncError(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new GlobalError("document not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  asyncError(async (req, res, next) => {
    let doc = await Model.create(req.body);

    if (!doc) {
      return next(new GlobalError("document not found", 404));
    }

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  asyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new GlobalError("document not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  asyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new GlobalError("doc not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
