const Product = require("../models/Product");
const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
} = require("./Controller");


let getProducts = getAll(Product);

let createProduct = createOne(Product);

let getProduct = getOne(Product, "product");

let updateProduct = updateOne(Product, "product");

let deleteProduct = deleteOne(Product, "product")

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}