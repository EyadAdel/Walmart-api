const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
    //when we add new department how we will add the subdepartments ?
    // we didn't have any departments added yet

    // subDepartments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'SubDepartment',
    //     required:true
    // }]
      
},{timestamps:true})

const departmentModel = mongoose.model('department',departmentSchema)
module.exports = departmentModel;
