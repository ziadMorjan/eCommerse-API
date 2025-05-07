const Category = require("../models/Category");
const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
} = require("./Controller");

let getCategories = getAll(Category);

let createCategory = createOne(Category)

let getCategory = getOne(Category, "category");

let updateCategory = updateOne(Category, "category")

let deleteCategory = deleteOne(Category, "category");

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};