const express = require("express");
const {
  getAllSubDeps,
  AddnewSubDep,
  getSubDepById,
  updateSubDepById,
  deleteSubDepartment,
} = require("../controllers/subSubDepartment");
const router = express.Router();

//Get All SubSubDepartments
router.get("/", getAllSubDeps);

//Get subSubDepartment by id
router.get("/:id", getSubDepById);

//Add new SubSubDepartment
router.post("/", AddnewSubDep);

//Update subSubDepartment
router.patch("/:id", updateSubDepById);

//Delete subSubDepartment
router.delete("/:id", deleteSubDepartment);

module.exports = router;
