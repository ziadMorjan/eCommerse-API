const { default: slugify } = require("slugify");
const SubCategory = require("../models/SubCategory");
const { asyncErrorHandler } = require("../middlewares/errorMiddleware");
const QueryManipulater = require("../utils/QueryManipulater");
const CustomError = require("../utils/CustomError");


let getSubCategories = asyncErrorHandler(async function (req, res) {
    let qm = new QueryManipulater(req, SubCategory)
        .filter()
        .sort()
        .limit()
        .paginate();

    let filter = {};
    if (req.params.categoryId)
        filter.category = req.params.categoryId;

    qm.query.find(filter);

    let subCategories = await qm.query;

    res.status(200).json({
        status: "success",
        count: subCategories.length,
        data: {
            subCategories
        }
    });

});

let getSubCategory = asyncErrorHandler(async function (req, res) {
    let subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory)
        throw new CustomError(`There is no sub category with id: ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            subCategory
        }
    });

});

let createSubCategory = asyncErrorHandler(async function (req, res) {
    if (req.body.name)
        req.body.slug = slugify(req.body.name);

    if (req.params.categoryId)
        req.body.category = req.params.categoryId;

    let newCategory = await SubCategory.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newCategory
        }
    });

});

let updateSubCategory = asyncErrorHandler(async function (req, res) {
    if (req.body.name)
        req.body.slug = slugify(req.body.name);

    let updatedCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body,
        {
            runValidators: true,
            new: true
        }
    );

    if (!updatedCategory)
        throw new CustomError(`There is no sub category with id: ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            updatedCategory
        }
    });

});

let deleteSubCategory = asyncErrorHandler(async function (req, res) {
    let deletedCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!deletedCategory)
        throw new CustomError(`There is no sub category with id: ${req.params.id}`, 404);

    res.status(204).json({
        status: "success"
    });

});

module.exports = {
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}