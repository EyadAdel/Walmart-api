const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: { //Electronics
        type: String,
        required: true,
        unique: true
    }
},{timestamps:true})

const departmentModel = mongoose.model('department',departmentSchema)
module.exports = departmentModel;
