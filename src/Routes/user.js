const express = require("express");
const userModel = require("../Models/user.model");
const userController = require("../Controllers/user.controller");

const router = express.Router();

// Get All Users
router.get("/", [userController.getAll]);

// Get One User
router.get("/:id", [userController.getOne]);

// Insert User
router.put("/", [userController.insert]);

// Update User
router.post("/:id", [userController.update]);

// Delete User
router.delete("/:id", [userController.delete]);

module.exports = router;
