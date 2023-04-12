const sellerModel = require("../models/seller");
const bcrypt = require("bcrypt");

//Get All Sellers
const getAllSellers = async (req, res, next) => {
  try {
    const allSellers = await sellerModel.find();
    res.status(200).json(allSellers);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Add new seller
const AddnewSeller = async (req, res, next) => {
  const seller = req.body;
  try {
    const addededSeller = await sellerModel.create(seller);
    const token = await seller.generateAuthToken();
    res.status(201).json({ addededSeller, token });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const loginSeller = async (req, res) => {
  try {
    const { businessEmail, password } = req.body;
    const seller = await sellerModel.findOne({ businessEmail });
    if (!seller) {
      res.status(404).send("invalid password or email");
      return;
    }
    const valid = bcrypt.compareSync(password, seller.password);
    if (!valid) {
      res.status(404).send("invalid password or email");
      return;
    }
    const token = await seller.generateAuthToken();
    res.send({ seller, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get seller by id
const getSellerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const specificSeller = await sellerModel.findById(id);
    res.status(200).json(specificSeller);
  } catch (err) {
    res.json({ message: err.message });
  }
};

//Update Seller
const updateSellerById = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    const updatedSeller = await sellerModel.findByIdAndUpdate(id, obj, {
      new: true,
    });
    res.json(updatedSeller);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//Delete Seller
const deleteSeller = async (req, res) => {
  const id = req.params.id;
  try {
    let deletedSeller = await sellerModel.findByIdAndDelete(id);
    res.json("Seller Deleted Successfully");
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  AddnewSeller,
  loginSeller,
  getAllSellers,
  getSellerById,
  updateSellerById,
  deleteSeller,
};
