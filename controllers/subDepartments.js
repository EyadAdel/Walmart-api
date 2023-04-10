const SubDepartmentModel = require("../models/subDepartments");

function getAllSubDeps() {
    return SubDepartmentModel.find();
  }
  function AddnewSubDep(department) {
    return SubDepartmentModel.create(department);
    
  }
  
  function getSubDepById(id) {
    return SubDepartmentModel.findById(id);
  }
  
  function updateSubDepById(id, obj) {
    return SubDepartmentModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
  }
  
  function deleteSubDepartment(id) {
    return SubDepartmentModel.findByIdAndDelete(id);
  }

  module.exports={AddnewSubDep,getAllSubDeps,getSubDepById,updateSubDepById,deleteSubDepartment}
