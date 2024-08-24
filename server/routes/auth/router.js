const router = require("express").Router();
const register = require("./register.js");
const login = require("./login.js");
const { body, validationResult } = require('express-validator');

router.post('/register',[
    body('username').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], register);

router.post('/login' , login);

module.exports = router;