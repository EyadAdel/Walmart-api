const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: String, // the name of the department
    parent_id: {
        type:mongoose.SchemaTypes.ObjectId,
        default: null
    },
    products: [{type:mongoose.SchemaTypes.ObjectId}], // an array of ids of products directly belonging to this department
      
},{timestamps:true})

const departmentModel = mongoose.model('department',departmentSchema)
module.exports = departmentModel;
