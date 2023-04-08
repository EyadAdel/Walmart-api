const adminModel=require("../models/admin")

  function getAllAdmins() {
    return adminModel.find();
  }
  function AddnewAdmin(admin) {
    return adminModel.create(admin);
  }
  
  function getAdminById(id) {
    return adminModel.findById(id);
  }
  
  function updateAdminById(id, obj) {
    return adminModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
  }
  
  function deleteAdminById(id) {
    return adminModel.findByIdAndDelete(id);
  }

  module.exports={AddnewAdmin,getAllAdmins,getAdminById,updateAdminById,deleteAdminById}
