const express = require("express");
const router = express.Router();
const {
  AddnewCustomer,
  checkPass,
  getAllCustomers,
  getCustomerByEmail,
  updateCustomerById,
  deleteCustomerById,
  customerLogin,
} = require("../controllers/customer");
const auth = require("../middlewares/auth");

//Customer login
router.post("/login", customerLogin);

// check the password
router.post("/signin", checkPass);

//To Create new Customer
router.post("/signup", AddnewCustomer);

// add new address
// router.post("/address",addAddress);

//Get all customers
router.get("/", auth, getAllCustomers);

//Get sepcific customer by email
router.get("/:email", getCustomerByEmail);

//Update in any field of specific customer by Id
router.patch("/:id", auth, updateCustomerById);

//Delete specific customer by id
router.delete("/:id", auth, deleteCustomerById);

module.exports = router;
