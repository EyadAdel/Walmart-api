const orderModel = require("../models/orders");
const productModel = require("../models/products");
const sellerModel = require("../models/seller");

//TODO: add populate total and test
const getAllOrders = async (req, res, next) => {
  try {
    var newOrder = await orderModel
      .find()
      .populate("customerID", "firstName email");
    res.status(200).json(newOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getOrderById = async (req, res, next) => {
  var { id } = req.params;
  try {
    var specificOrder = await orderModel
      .findById(id)
      .populate("customerID", "firstName email")
      .populate("items.product", "name priceAfter");
    const totalPrice = await specificOrder.totalPrice;
    // console.log(totalPrice);
    res.status(200).json({ specificOrder, totalPrice });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    // if (req.role == "customer") {
    const order = new orderModel({
      // customerID: req.customer._id,
      // customerID,
      // items,
      ...req.body,
    });

    // Check if all products in the order have enough stock
    let allAvailable = true;
    for (const item of order.items) {
      const product = await productModel.findOne({ _id: item.product });
      if (product.quantity < item.quantity) {
        allAvailable = false;
        break;
      }
    }

    if (!allAvailable) {
      res.status(400).json({ error: "Out of stock" });
      return;
    }

    await order.save();

    // Update the Seller model for each item in the order
    for (const item of order.items) {
      try {
        const product = await productModel.findOne({ _id: item.product });
        await sellerModel.findByIdAndUpdate(
          product.sellerID,
          {
            $push: {
              orders: {
                products: product._id,
                parentOrder: order._id,
                quantity: item.quantity,
              },
            },
          },
          { upsert: true }
        );
        const updatedStockQuantity = product.quantity - item.quantity;
        await productModel.findByIdAndUpdate(
          product._id,
          { quantity: updatedStockQuantity },
          { new: true }
        );
      } catch (err) {
        console.error(err);
      }
    }
    res.status(201).send(order);
    // } else {
    //   res.status(400).send("you are not a customer");
    // }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;

    // Find the order in the database and update its status
    const order = await orderModel.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: status } },
      { new: true }
    );

    // Send a notification to the customer
    await sendNotification(order.customerId, status);

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

//-----------------------------------------//

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
