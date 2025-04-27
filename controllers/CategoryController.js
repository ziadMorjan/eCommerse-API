const Category = require("../models/Category");
const CustomError = require("../utils/CustomError");
const QueryManipulater = require("../utils/QueryManipulater");
const { asyncErrorHandler } = require("../middlewares/errorMiddleware");
const { default: slugify } = require("slugify");

let getCategories = asyncErrorHandler(async function (req, res) {

    let qm = new QueryManipulater(req, Category)
        .filter()
        .limit()
        .sort()
        .paginate();

    let categories = await qm.query;

    res.status(200).json({
        status: "success",
        count: categories.length,
        data: {
            categories
        }
    });
});

let createCategory = asyncErrorHandler(async function (req, res) {
    let { name } = req.body;
    let newCategory = await Category.create({
        ...req.body,
        slug: slugify(name)
    });

    res.status(201).json({
        status: "success",
        data: {
            newCategory
        }
    });
});

let getCategory = asyncErrorHandler(async function (req, res) {
    let category = await Category.findById(req.params.id);

    if (!category)
        throw new CustomError(`There is no category with id : ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            category
        }
    });
});

let updateCategory = asyncErrorHandler(async function (req, res) {
    let bodyToUpdate = req.body;
    if (req.body.name)
        req.body.slug = slugify(req.body.name);
    let updatedCategory = await Category.findByIdAndUpdate(req.params.id, bodyToUpdate,
        {
            runValidators: true,
            new: true
        }
    );

    if (!updatedCategory)
        throw new CustomError(`There is no category with id : ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            updatedCategory
        }
    });
});

let deleteCategory = asyncErrorHandler(async function (req, res) {
    let deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory)
        throw new CustomError(`There is no category with id : ${req.params.is}`, 404);

    res.status(204).json({
        status: "success",
    });
});

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};