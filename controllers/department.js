const departmentModel = require("../models/departments")

const getAllDepartments = async (req, res, next) => { 
  try{
      const departments = await departmentModel.find();
      res.status(200).json(departments);
  }
  catch (err){
      res.json({message: err.message})
  }
}
  const AddnewDep = async (req, res, next) => {
    const departmentToBeSaved = req.body;
    try{
        const addededDepartment = await departmentModel.create(departmentToBeSaved);
        res.status(201).json(addededDepartment)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }
    
}
  
  const getDepById = async (req,res,next)=>{
    const {id} = req.params;
    try{
        const specificDep = await departmentModel.findById(id);
        res.status(200).json(specificDep)
    }
    catch(err){
        res.json({message: err.message})
    }
}
  
  const updateDepById = async (req, res,) => {
    const id = req.params.id
    const obj = req.body
    try{
        let updatedDep = await departmentModel.findByIdAndUpdate(id, obj, { new: true });
        res.json(updatedDep)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

}
  
  const deleteDepartment = async (req,res)=>{
    const id = req.params.id
    try{
        let deletedDep = await departmentModel.findByIdAndDelete(id);
        res.json("Department Deleted Successfully")
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
}

module.exports={AddnewDep,getAllDepartments,getDepById,updateDepById,deleteDepartment}
