const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/details", auth, userController.getUserDetails);

module.exports = router;