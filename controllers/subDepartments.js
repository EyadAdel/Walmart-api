const departmentModel = require("../models/departments")

function getAllSubDeps() {
    return departmentModel.find();
  }
  function AddnewSubDep(department) {
    return departmentModel.create(department);
  }
  
  function getSubDepById(id) {
    return departmentModel.findById(id);
  }
  
  function updateSubDepById(id, obj) {
    return departmentModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
  }
  
  function deleteSubDepartment(id) {
    return departmentModel.findByIdAndDelete(id);
  }

  module.exports={AddnewSubDep,getAllSubDeps,getSubDepById,updateSubDepById,deleteSubDepartment}
