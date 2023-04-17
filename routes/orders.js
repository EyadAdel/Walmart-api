var express = require("express");
const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order");
var router = express.Router();

// get all orders
router.get("/", getAllOrders);

// get order by id
router.get("/:id", getOrderById);

// Create a new order
router.post("/", createOrder);

// add new order
// router.post("/", AddnewOrder);

// update order status
router.patch("/:id", updateOrderStatus);

// delete order
router.delete("/:id", deleteOrder);

module.exports = router;
