var express = require("express");
const {
  getAllOrders,
  AddnewOrder,
  getOrderById,
  updateOrderById,
  deleteOrder,
} = require("../controllers/order");
var router = express.Router();

// get all orders
router.get("/", getAllOrders);

// get order by id
router.get("/:id", getOrderById);

// add new order
router.post("/", AddnewOrder);

// update order
router.patch("/:id", updateOrderById);

// delete order
router.delete("/:id", deleteOrder);

module.exports = router;
