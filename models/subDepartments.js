const mongoose = require('mongoose');

const subDepartmentSchema = new mongoose.Schema({
    name: { //computer
      type: String,
      required: true,
    },
    subcategories: [ //laptops, pc, ipad, ...
      {
        name: {
          type: String,
          required: true,
        }
      }
    ],
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
      required: true,
    }
});

const SubDepartmentModel = mongoose.model('SubDepartment', subDepartmentSchema);

module.exports = SubDepartmentModel;