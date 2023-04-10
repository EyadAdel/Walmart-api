const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true,
        },
        priceBefore:Number,
        priceAfter:{type:Number,required:true},
        brand:{type:String,required:true},
        quantity:Number,
        colors:[{
            name:String, //red
            image:String //img of product in specific color
        }],
        size:[{
            val:Number, //32,38,40
            name:String //Medium, large, xs
        }],
        photos:{type:Array,required:true},
        badges:Array,
        tags:Array,
        productDetails:{type:String,required:true},
        specifications:[{type:Object, required:true}],
        warranty:String,
        departmentID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'department',
            required: true
        },
        subDepartmentID:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'SubDepartment',
            required:true
        },
        nestedSubDepartment:{
            type:mongoose.SchemaTypes.ObjectId,
        },
        sellerID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'seller',
            required:true
        }
}, {timestamps:true}); 

const productModel= mongoose.model('product', productSchema);
module.exports= productModel;