const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
        SellerID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'seller'
        },
        authorID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'customer'
        },
        rating:Number,
        text:String,
        likes:Number,
        likesArray:Array,
        dislikes:Number,
        dislikesArray:Array,
}, {timestamps:true}); 

const reviewModel= mongoose.model('review', reviewSchema);
module.exports= reviewModel;