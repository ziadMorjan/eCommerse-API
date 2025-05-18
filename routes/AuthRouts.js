const express = require("express");
const {
    signup,
    login,
    forgetPassword,
    verifyResetCode,
    resetPassword
} = require("../controllers/AuthController");
const {
    signupValidator,
    loginValidator,
    forgetPasswordValidator,
    verifyResetCodeValidator,
    resetPasswordValidator
} = require("../utils/validators/authValidators");

let router = express.Router();

router.route("/signup")
    .post(
        signupValidator,
        signup
    );

router.route("/login")
    .post(
        loginValidator,
        login
    );

router.route("/forgetPassword")
    .post(
        forgetPasswordValidator,
        forgetPassword
    );

router.route("/verifyResetCode")
    .post(
        verifyResetCodeValidator,
        verifyResetCode
    );

router.route("/resetPassword")
    .patch(
        resetPasswordValidator,
        resetPassword
    );

module.exports = router;