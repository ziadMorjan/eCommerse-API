const express = require("express");
const CustomError = require("../utils/CustomError");

let router = express.Router();

router.all("*", (req, res) => {
    throw new CustomError(`Can not find ${req.originalUrl} on the server`, 404);
});

module.exports = router;