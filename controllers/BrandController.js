const Brand = require("../models/Brand");
const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
} = require("./Controller");

let getAllBrands = getAll(Brand);

let createBrand = createOne(Brand);

let getBrand = getOne(Brand, "brand");

let updateBrand = updateOne(Brand, "brand")

let deleteBrand = deleteOne(Brand, "brand");

module.exports = {
    getAllBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
};