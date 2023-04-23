const express = require("express");
const {
  getAllAdmins,
  AddnewAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  loginAdmin,
} = require("../controllers/admin");
const router = express.Router();

// get all admins
router.get("/", getAllAdmins);

// get admin by id
router.get("/:id", getAdminById);

// add new admin
router.post("/", AddnewAdmin);

// add new admin
router.post("/login", loginAdmin);

// update admin
router.patch("/:id", updateAdminById);

// delete admin
router.delete("/:id", deleteAdminById);

module.exports = router;
