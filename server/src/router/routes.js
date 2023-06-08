const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/createUser", userController.createUser);

router.post("/login", userController.authentication);

module.exports = router;
