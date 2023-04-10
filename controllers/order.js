const orderModel = require("../models/orders");

const getAllOrders = async (req, res, next) => {
  try {
    var newOrder = await orderModel.find();
    res.status(200).json(newOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};
const AddnewOrder = async (req, res, next) => {
  var seller = req.body;
  try {
    var addededOrder = await AddnewOrder(seller);
    res.status(201).json(addededOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getOrderById = async (req, res, next) => {
  var { id } = req.params;
  try {
    var specificOrder = await orderModel.findById(id);
    res.status(200).json(specificOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateOrderById = async (req, res) => {
  var id = req.params.id;
  var obj = req.body;
  try {
    let updatedOrder = await orderModel.findByIdAndUpdate(id, obj, {
      new: true,
    });
    res.json(updatedOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  var id = req.params.id;
  try {
    let deletedSeller = await orderModel.findByIdAndDelete(id);
    res.json("Order Deleted Successfully");
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  AddnewOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrder,
};
