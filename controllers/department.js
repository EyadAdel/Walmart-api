const departmentModel = require("../models/departments")

function getAllDepartments() {
    return departmentModel.find();
  }
  function AddnewDep(department) {
    return departmentModel.create(department);
  }
  
  function getDepById(id) {
    return departmentModel.findById(id);
  }
  
  function updateDepById(id, obj) {
    return departmentModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
  }
  
  function deleteDepartment(id) {
    return departmentModel.findByIdAndDelete(id);
  }

  module.exports={AddnewDep,getAllDepartments,getDepById,updateDepById,deleteDepartment}
