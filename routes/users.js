const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/", UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;
