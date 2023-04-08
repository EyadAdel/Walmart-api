const sellerModel=require("../models/seller")

  function getAllSellers() {
    return sellerModel.find();
  }
  function AddnewSeller(admin) {
    return sellerModel.create(admin);
  }
  
  function getSellerById(id) {
    return sellerModel.findById(id);
  }
  
  function updateSellerById(id, obj) {
    return sellerModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
  }
  
  function deleteSeller(id) {
    return sellerModel.findByIdAndDelete(id);
  }

  module.exports={AddnewSeller,getAllSellers,getSellerById,updateSellerById,deleteSeller}
