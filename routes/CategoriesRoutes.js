
const express = require("express");
const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/CategoryController");

let router = express.Router();

router.route("/")
    .get(getCategories)
    .post(createCategory);

router.route("/:id")
    .get(getCategory)
    .patch(updateCategory)
    .delete(deleteCategory);

module.exports = router;