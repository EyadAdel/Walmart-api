const express = require('express')
const { getAllDepartments,AddnewDep,getDepById,updateDepById,deleteDepartment } = require('../controllers/department');
const router = express.Router()

// get all departments
router.get("/", getAllDepartments)

// get department by id
router.get("/:id",getDepById)

// add new department
router.post("/", AddnewDep)

// update department
router.patch("/:id",updateDepById)

// delete department
router.delete("/:id", deleteDepartment);

module.exports = router

