const orderModel = require("../models/orders")

function getAllOrders() {
    return orderModel.find();
  }
  function AddnewOrder(order) {
    return orderModel.create(order);
  }
  
  function getOrderById(id) {
    return orderModel.findById(id);
  }
  
  function updateOrderById(id, obj) {
    return orderModel.findByIdAndUpdate(id, obj, { new: true });//new(options) if true, return the modified document rather than the original
  }
  
  function deleteOrder(id) {
    return orderModel.findByIdAndDelete(id);
  }

  module.exports={AddnewOrder,getAllOrders,getOrderById,updateOrderById,deleteOrder}
