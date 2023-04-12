const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const departmentModel = mongoose.model("department", departmentSchema);
module.exports = departmentModel;
