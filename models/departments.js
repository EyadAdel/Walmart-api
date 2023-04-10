const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    subDepartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubDepartment',
      }]
      
},{timestamps:true})

const departmentModel = mongoose.model('department',departmentSchema)
module.exports = departmentModel;
