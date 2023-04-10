const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: String, 
    subDepartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubDepartment',
      }],
    products: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "product"
    }], 
      
},{timestamps:true})

const departmentModel = mongoose.model('department',departmentSchema)
module.exports = departmentModel;
