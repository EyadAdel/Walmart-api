const mongoose = require("mongoose")

var sellerSchema = mongoose.Schema({
    firstName:{
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true
    },
    lastName:{
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true
    },
    businessName:{
        type: String,
    },
    businessEmail:{
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]{3,20}(@)(gmail|yahoo|outlook)(.com)$/.test(v);
            },
            message: props => {
                console.log(props);
                return `${props.value} is not a valid email !`
            }
        }
    },
    businessPhone:{
        type: Number,
        validator: function (v) {
            // regix for american number /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
            //egyptian number
            return /^01[0-2]\s\d{1,8}$/.test(v);
        },
        message: props => {
            console.log(props);
            return `${props.value} is not a valid phone number !`
        }
    },
    password:{
        type: String,
        required: true
    },
    payments:{
        type: Array,
    },
    shipping:{
        type: Array
    },
    badges:{
        type: Array
    }
    
},{timestamps : true})

var sellerModel = mongoose.model('seller',sellerSchema)
module.exports = sellerModel