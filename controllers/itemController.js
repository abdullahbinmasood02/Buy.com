const itemModel = require("../models/itemModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    let clonedObj = { ...this.queryObj };
    const excluded = ["limit", "fields", "sort", "pages"];

    excluded.forEach((item) => delete clonedObj[item]); // only the filter string remains

    let filterStr = JSON.stringify(clonedObj);

    filterStr = filterStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`,
    );
    this.query = this.query.find(JSON.parse(filterStr));
    return this;
  }

  sort() {
    let sortStr = "";

    if (this.queryObj.sort) {
      sortStr = this.queryObj.sort.split(",").join(" ");
    } else {
      sortStr = "-price";
    }

    this.query = this.query.sort(sortStr);
    return this;
  }

  getFields() {
    let fieldsStr = "";

    if (this.queryObj.fields) {
      fieldsStr = this.queryObj.fields.split(",").join(" ");
    } else {
      fieldsStr = "name price";
    }

    this.query = this.query.select(fieldsStr);
    return this;
  }

  getPages() {
    let toSkip;

    if (this.queryObj.pages) {
      toSkip = (this.queryObj.pages - 1) * this.queryObj.limit;
    } else {
      toSkip = 0;
    }
    let limit = this.queryObj.limit || 0;

    this.query = this.query.skip(toSkip).limit(limit);
    return this;
  }
}

exports.getItem = catchAsync(async (req, res, next) => {
  const item = await itemModel.findById(req.params.id);

  if (!item) next(new AppError("no item found with that id"));

  res.status(200).json({
    status: "success",
    data: { item },
  });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
  let query = itemModel.find();
  let queryObj = req.query;

  let apiFeatures = new ApiFeatures(query, queryObj);
  const allItems = await apiFeatures.filter().sort().getFields().getPages()
    .query;

  res.status(200).json({
    status: "success",
    data: { allItems },
  });
});

exports.postItem = catchAsync(async (req, res, next) => {
  const newItem = await itemModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: { newItem },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const deleted = await itemModel.findByIdAndDelete(req.params.id);
  if (!deleted) next(new AppError("no item found with that id"));

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const updatedItem = await itemModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedItem) next(new AppError("no item found with that id"));

  res.status(200).json({
    status: "success",
    data: { updatedItem },
  });
});
