const SubDepartmentModel = require("../models/subSubDepartment");

//Get All SubDepartments
const getAllSubDeps = async (req, res, next) => {
  try {
    const subDepartments = await SubDepartmentModel.find();
    res.status(200).json(subDepartments);
  } catch (err) {
    res.json({ message: err.message });
  }
};
//Get subDepartment by id
const getSubDepById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const specificSubDep = await SubDepartmentModel.findById(id);
    res.status(200).json(specificSubDep);
  } catch (err) {
    res.json({ message: err.message });
  }
};
//Add new subDepartment
const AddnewSubDep = async (req, res, next) => {
  const newSubDepartment = req.body;
  try {
    const addededSubDep = await SubDepartmentModel.create(newSubDepartment);
    res.status(201).json(addededSubDep);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//Update subDepartment
const updateSubDepById = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    let updatedSubDep = await SubDepartmentModel.findByIdAndUpdate(id, obj, {
      new: true,
    });
    res.json(updatedSubDep);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//Delete SubDepartment
const deleteSubDepartment = async (req, res) => {
  const id = req.params.id;
  try {
    await SubDepartmentModel.findByIdAndDelete(id);
    res.json("Sub-Department Deleted Successfully");
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  AddnewSubDep,
  getAllSubDeps,
  getSubDepById,
  updateSubDepById,
  deleteSubDepartment,
};
