const express= require('express')
const validate = require("../Middleware/Validate");
const  router =express.Router()
const { registerSchema, loginSchema } = require("../Validators/authValidator");
const { registerUser, loginUser } = require("../Controller/authController");
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);


module.exports=router