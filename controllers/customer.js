const customerModel = require("../models/customer");
const bcrypt = require("bcrypt");

const customerLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const customer = await customerModel.findOne({ email });
    if (customer) {
      res.status(201).send({ isFound: true });
      return;
    } else {
      res.status(201).send({ isFound: false });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in customer: " + err.message);
  }
};

const checkPass = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await customerModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      res.status(401).send("Invalid password");
      return;
    }
    const token = await customer.generateAuthToken();
    res.json({ customer, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error check password of customer: " + err.message);
  }
};

const AddnewCustomer = async (req, res, next) => {
  try {
    const customerData = req.body;
    const newCustomer = await customerModel.create(customerData);
    const token = await newCustomer.generateAuthToken();
    res.status(201).json({ newCustomer, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//TODO: complete it after adding token
// const addAddress = async (req, res) => {
//   const address = req.body;
// };

const getAllCustomers = async (req, res, next) => {
  try {
    if (req.role === "admin") {
      const customersEmail = await customerModel
        .find({})
        .populate("lists.favorites", "name")
        .populate("cart.product", "name");
      res.status(200).json(customersEmail);
    } else {
      res.status(500).json({ message: "Only admin can do that" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCustomerByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const customersEmail = await customerModel
      .find({ email })
      .populate("lists.favorites", "name")
      .populate("cart.product", "name");
    res.status(200).json(customersEmail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    if (req.role === "customer" && id.equals(req.customer._id)) {
      const updateFirstNameOfCustomer = await customerModel.findByIdAndUpdate(
        id,
        obj,
        { new: true }
      );
      res.status(200).json(updateFirstNameOfCustomer);
    } else {
      res.status(500).json({ message: `It's not your account` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (
      (req.role === "customer" && id.equals(req.customer._id)) ||
      req.role === "admin"
    ) {
      await customerModel.deleteOne({ _id: id });
      res.status(200).json("Customer deleted successfully");
    } else {
      res.status(500).json({ message: `It's not your account` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  customerLogin,
  checkPass,
  AddnewCustomer,
  getAllCustomers,
  getCustomerByEmail,
  updateCustomerById,
  deleteCustomerById,
};
