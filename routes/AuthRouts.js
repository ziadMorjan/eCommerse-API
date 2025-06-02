const express = require("express");
const passport = require('passport');
const { createToken } = require('../utils/JWTs');
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

const router = express.Router();

// OAuth Handlers
const oAuthCallbackHandler = (req, res) => {
    const token = createToken(req.user.id);
    res.status(201).json({
        status: "success",
        user: req.user,
        token
    });
};

// Google OAuth
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback",
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    oAuthCallbackHandler
);

// Facebook OAuth
router.get("/facebook", passport.authenticate('facebook', { scope: ['email'] }));
router.get("/facebook/callback",
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    oAuthCallbackHandler
);

// Auth Routes
router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

// --- Password Reset Routes ---
router.post("/forgetPassword", forgetPasswordValidator, forgetPassword);
router.post("/verifyResetCode", verifyResetCodeValidator, verifyResetCode);
router.patch("/resetPassword", resetPasswordValidator, resetPassword);

module.exports = router;