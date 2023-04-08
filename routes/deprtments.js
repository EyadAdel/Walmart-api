const express = require('express')
const { getAllDepartments,AddnewDep,getDepById,updateDepById,deleteDepartment } = require('../controllers/department');
const router = express.Router()

// get all departments
router.get("/", async (req, res, next) => { 
    try{
        const departments = await getAllDepartments();
        res.status(200).json(departments);
    }
    catch (err){
        res.json({message: err.message})
    }
})

// get department by id
router.get("/:id",async (req,res,next)=>{
    const {id} = req.params;
    try{
        const specificDep = await getDepById(id);
        res.status(200).json(specificDep)
    }
    catch(err){
        res.json({message: err.message})
    }
})

// add new department
router.post("/", async (req, res, next) => {
    const departmentToBeSaved = req.body;
    try{
        const addededDepartment = await AddnewDep(departmentToBeSaved);
        res.status(201).json(addededDepartment)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }
    
})

// update department
router.patch("/:id",async (req, res,) => {
    const id = req.params.id
    const obj = req.body
    try{
        let updatedDep = await updateDepById(id,obj)
        res.json(updatedDep)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

})

// delete department
router.delete("/:id", async (req,res)=>{
    const id = req.params.id
    try{
        let deletedDep = await deleteDepartment(id);
        res.json("Department Deleted Successfully")
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
});

module.exports = router

