const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");

const getAllAdmins = async (req, res, next) => {
  try {
    const newAdmin = await adminModel.find();
    res.status(200).json(newAdmin);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      res.status(404).send("invalid password or email");
      return;
    }
    const valid = bcrypt.compareSync(password, admin.password);
    if (!valid) {
      res.status(404).send("invalid password or email");
      return;
    }
    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const AddnewAdmin = async (req, res, next) => {
  const admin = req.body;
  try {
    const savedAdmin = await adminModel.create(admin);
    const token = await savedAdmin.generateAuthToken();
    res.status(201).json({ savedAdmin, token });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getAdminById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const specificAdmin = await adminModel.findById(id);
    res.status(200).json(specificAdmin);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateAdminById = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    let updatedAdmin = await adminModel.findByIdAndUpdate(id, obj, {
      new: true,
    }); //new(options) if true, return the modified document rather than the original
    res.json(updatedAdmin);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const deleteAdminById = async (req, res) => {
  const id = req.params.id;
  try {
    let deletedAdmin = await adminModel.findByIdAndDelete(id);
    res.json("Admin deleted successfully");
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  AddnewAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
