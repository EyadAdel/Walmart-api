const orderModel = require("../models/orders");

//TODO: add populate total and test
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
    var specificOrder = await orderModel.findById(id).populate("items.product");
    const totalPrice = await specificOrder.totalPrice;
    console.log(totalPrice);
    res.status(200).json(specificOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    // if (req.role == "customer") {
    const order = new Order({
      // customerID: req.customer._id,
      ...req.body,
    });
    await order.save();
    res.status(201).send(order);
    // } else {
    //   res.status(400).send("you are not a customer");
    // }
  } catch (err) {
    res.status(400).send(err.message);
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
    await orderModel.findByIdAndDelete(id);
    res.json("Order Deleted Successfully");
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  AddnewOrder,
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrder,
};
