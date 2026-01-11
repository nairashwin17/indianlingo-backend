const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/register", signupValidation , signup);

router.post("/login", loginValidation, login);

module.exports = router;