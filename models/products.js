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
        catID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'departments'
        },
        sellerID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'seller'
        }
}, {timestamps:true}); 

const productModel= mongoose.model('products', productSchema);
module.exports= productModel;