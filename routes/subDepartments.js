const express = require('express')
const { getAllSubDeps,AddnewSubDep,getSubDepById,updateSubDepById,deleteSubDepartment } = require('../controllers/subDepartments');
const router = express.Router()

// get all sub-departments
router.get("/", async (req, res, next) => { 
    try{
        const subDepartments = await getAllSubDeps();
        res.status(200).json(subDepartments);
    }
    catch (err){
        res.json({message: err.message})
    }
})

// get sub-department by id
router.get("/:id",async (req,res,next)=>{
    const {id} = req.params;
    try{
        const specificSubDep = await getSubDepById(id);
        res.status(200).json(specificSubDep)
    }
    catch(err){
        res.json({message: err.message})
    }
})

// add new department
router.post("/", async (req, res, next) => {
    const newSubDepartment = req.body;
    try{
        const addededSubDep = await AddnewSubDep(newSubDepartment);
        res.status(201).json(addededSubDep)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }  
})

// update sub-department
router.patch("/:id",async (req, res,) => {
    const id = req.params.id
    const obj = req.body
    try{
        let updatedSubDep = await updateSubDepById(id,obj)
        res.json(updatedSubDep)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

})

// delete sub-department
router.delete("/:id", async (req,res)=>{
    const id = req.params.id
    try{
        let deletedSubDep = await deleteSubDepartment(id);
        res.json("Sub-Department Deleted Successfully")
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
});

module.exports = router

