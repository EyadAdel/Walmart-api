const express = require('express')
const { getAllSubDeps,AddnewSubDep,getSubDepById,updateSubDepById,deleteSubDepartment } = require('../controllers/subDepartments');
const router = express.Router()

//Get All SubDepartments
router.get("/", getAllSubDeps);

//Get subDepartment by id
router.get("/:id",getSubDepById)

//Add new SubDepartment
router.post("/", AddnewSubDep);

//Update subDepartment
router.patch("/:id",updateSubDepById)

//Delete subDepartment
router.delete("/:id", deleteSubDepartment);

module.exports = router

