const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

var adminSchema = mongoose.Schema({
    name:{
        type: String,
        minLength: 8,
        required: true
    },
    email: {
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
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        validator:{
            validator: function (v) {
                // regix for american number /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
                //egyptian number
                return /^01[0-2]\s\d{1,8}$/.test(v);
            },
            message: props => {
                console.log(props);
                return `${props.value} is not a valid phone number !`
            }
        }
    },
    role:{
        type: String,
        default: "Adminstrator"
    }
}, { timestamps: true })

adminSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword
    next()
})


var adminModel = mongoose.model('admin',adminSchema)
module.exports = adminModel