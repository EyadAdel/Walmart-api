const express = require('express')
const {getAllAdmins,AddnewAdmin,getAdminById,updateAdminById,deleteAdminById} = require('../controllers/admin')
const router = express.Router()

// get all admins
router.get("/", async (req, res, next) => { 
    try{
        var newAdmin = await getAllAdmins();
        res.status(200).json(newAdmin) 
    }
    catch (err){
        res.json({message: err.message})
    }
})

// get admin by id
router.get("/:id",async (req,res,next)=>{
    var {id} = req.params
    try{
        var specificAdmin = await getAdminById(id);
        res.status(200).json(specificAdmin)
    }
    catch(err){
        res.json({message: err.message})
    }
})

// add new admin
router.post("/", async (req, res, next) => {
    var admin = req.body
    try{
        var savedAdmin = await AddnewAdmin(admin);
        res.status(201).json(savedAdmin)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }
    
})

// update admin
router.patch("/:id",async (req, res,) => {
    var id = req.params.id
    var obj = req.body
    try{
        let updatedAdmin = await updateAdminById(id,obj)
        res.json(updatedAdmin)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

})

// delete admin
router.delete("/:id", async (req,res)=>{
    var id = req.params.id
    try{
        let deletedAdmin = await deleteAdminById(id);
        res.json("Admin deleted successfully");
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
});

module.exports = router;

