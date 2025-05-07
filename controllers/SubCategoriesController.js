const SubCategory = require("../models/SubCategory");
const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
} = require("./Controller");

let getSubCategories = getAll(SubCategory);

let createSubCategory = createOne(SubCategory);

let getSubCategory = getOne(SubCategory, "SubCategory");

let updateSubCategory = updateOne(SubCategory, "SubCategory");

let deleteSubCategory = deleteOne(SubCategory, "SubCategory");

module.exports = {
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}