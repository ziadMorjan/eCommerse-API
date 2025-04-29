const { default: slugify } = require("slugify");
const { asyncErrorHandler } = require("../middlewares/errorMiddleware");
const Brand = require("../models/Brand");
const QueryManipulater = require("../utils/QueryManipulater");
const CustomError = require("../utils/CustomError");

let getAllBrands = asyncErrorHandler(async function (req, res) {
    let qm = new QueryManipulater(req, Brand)
        .filter()
        .limit()
        .sort()
        .paginate();

    let brands = await qm.query;

    res.status(200).json({
        status: "success",
        count: brands.length,
        data: {
            brands
        }
    });
});



let createBrand = asyncErrorHandler(async function (req, res) {
    if (req.body.name)
        req.body.slug = slugify(req.body.name);

    let newBrand = await Brand.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newBrand
        }
    });
});

let getBrand = asyncErrorHandler(async function (req, res) {
    let brand = await Brand.findById(req.params.id);

    if (!brand)
        throw new CustomError(`There is no brand with id : ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            brand
        }
    });
});

let updateBrand = asyncErrorHandler(async function (req, res) {
    if (req.body.name)
        req.body.slug = slugify(req.body.name);

    let updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body,
        {
            runValidators: true,
            new: true
        }
    );

    if (!updatedBrand)
        throw new CustomError(`There is no brand with id : ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            updatedBrand
        }
    });
});

let deleteBrand = asyncErrorHandler(async function (req, res) {
    let deletedBrand = await Brand.findByIdAndDelete(req.params.id);

    if (!deletedBrand)
        throw new CustomError(`There is no brand with id : ${req.params.is}`, 404);

    res.status(204).json({
        status: "success",
    });
});

module.exports = {
    getAllBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
};