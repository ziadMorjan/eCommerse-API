const CustomError = require("../utils/CustomError");

let asyncErrorHandler = function (asyncFn) {
    return (req, res, next) => {
        asyncFn(req, res, next).catch(error => next(error));
    }
}

let globalErrorHandler = function (error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if (process.env.NODE_ENV == "development")
        devErrors(res, error);

    if (process.env.NODE_ENV == "production") {
        if (error.code == 11000) error = duplicateKeyError(error);

        prodErrors(res, error);
    }

}

let devErrors = function (res, error) {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
        error
    });
}

let prodErrors = function (res, error) {
    if (error.isOperational)
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    else
        res.status(500).json({
            status: "error",
            message: "Some thing is wrong"
        });
}

let duplicateKeyError = error => new CustomError(`There is already document with the ${error.keyValue}: ${error.keyValue}`, 400);

module.exports = {
    asyncErrorHandler,
    globalErrorHandler
};