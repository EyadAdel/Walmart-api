const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = mongoose.Schema({
    firstName: {
        type:String,
        minLength:3,
        maxLength:12,
        required:true,
    },
    lastName: {
        type:String,
        minLength:3,
        maxLength:12,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: function(email){
                return /^[a-zA-Z]{4,15}(@)(gmail|yahoo|outlook)(.com)$/.test(email)
            },
            message: props =>`${props.value} is not a valid email`
        }
    },
    // phone:{
    //     type:Number,
    //     validate:{
    //         validator: function(phone){
    //             return /^(012|011|010|015)[0-9]{8}$/.test(phone)
    //         },
    //         message: props =>`${props.value} is not a valid Phone Number`
    //     }
    // },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Array,
    },
    wallet:{
        type:Array
    },
    lists:{
        type:Array
    },
    cart:[
        {
            productID:Number,
            quantity:{
                type:Number,
                default:1
            },
            price:Number
        }
    ]
}, {timestamps:true}); 


//Middleware => before saving any document 
customerSchema.pre('save', function(next){
   const salt= bcrypt.genSaltSync(20)
   const hashedPassword = bcrypt.hashSync(this.password, salt)
   this.password = hashedPassword; 
   next()
})

const customerModel= mongoose.model('customer', customerSchema);
module.exports= customerModel;

