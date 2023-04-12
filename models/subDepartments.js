const mongoose = require("mongoose");

const subDepartmentSchema = new mongoose.Schema({
  parentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const SubDepartmentModel = mongoose.model("SubDepartment", subDepartmentSchema);

module.exports = SubDepartmentModel;
