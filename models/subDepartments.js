const mongoose = require('mongoose');

const subDepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
    required: true,
  }
});

const SubDepartment = mongoose.model('SubDepartment', subDepartmentSchema);

module.exports = SubDepartment;