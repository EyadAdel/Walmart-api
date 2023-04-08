const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
        user_id: {type:mongoose.SchemaTypes.ObjectId}, // ID of the user who placed the order
        items: [ // an array of items in the order
          {
            product_id: {type:mongoose.SchemaTypes.ObjectId}, // ID of the product
            name: String, // name of the product
            price: Number, // price of the product
            quantity: Number, // quantity ordered
          }
        ],
        shipping_address: { // shipping address information
          name: String, // name of the recipient
          address_line_1: String,
          address_line_2: String,
          city: String,
          state: String,
          country: String,
          postal_code: String
        },
        total_amount: Number, // total amount for the order
        status: String, // current status of the order (e.g. "processing", "shipped", "delivered")
        created_at: Date, // date and time the order was created
        updated_at: Date, // date and time the order was last updated
      
},{timestamps:true})

const OrderModel = mongoose.model('orders',ordersSchema)
module.exports = OrderModel;
