const adminModel=require("../models/admin")

  const getAllAdmins = async (req, res, next) => { 
    try{
        var newAdmin = await adminModel.find();
        res.status(200).json(newAdmin) 
    }
    catch (err){
        res.json({message: err.message})
    }
}
  const AddnewAdmin = async (req, res, next) => {
    var admin = req.body
    try{
        var savedAdmin = await adminModel.create(admin);
        res.status(201).json(savedAdmin)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }
    
}
  
  const getAdminById = async (req,res,next)=>{
    var {id} = req.params
    try{
        var specificAdmin = await adminModel.findById(id);
        res.status(200).json(specificAdmin)
    }
    catch(err){
        res.json({message: err.message})
    }
}
  
  const updateAdminById = async (req, res,) => {
    var id = req.params.id
    var obj = req.body
    try{
        let updatedAdmin = await adminModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
        res.json(updatedAdmin)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

}
  
  const deleteAdminById = async (req,res)=>{
    var id = req.params.id
    try{
        let deletedAdmin = await adminModel.findByIdAndDelete(id);;
        res.json("Admin deleted successfully");
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
}

  module.exports={AddnewAdmin,getAllAdmins,getAdminById,updateAdminById,deleteAdminById}
