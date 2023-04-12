const mongoose = require("mongoose");
const productModel = require("../models/products");

const ordersSchema = mongoose.Schema(
  {
    // customerID: { type: mongoose.SchemaTypes.ObjectId }, // ID of the user who placed the order
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [
      // an array of items in the order
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    // shipping_address: {
    //   // shipping address information
    //   name: String, // name of the recipient
    //   address_line_1: String,
    //   address_line_2: String,
    //   city: String,
    //   state: String,
    //   country: String,
    //   postal_code: String,
    // },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    // status: String, // current status of the order (e.g. "processing", "shipped", "delivered")
    // total_amount: Number, // total amount for the order
  },
  { timestamps: true }
);

// adding total price field
ordersSchema.virtual("totalPrice").get(async function () {
  console.log(1);
  let totalPrice = 0;
  for (const item of this.products) {
    const product = await productModel.findById(item.product);
    totalPrice += product.priceAfter * item.quantity;
  }
  return totalPrice;
});

const OrderModel = mongoose.model("orders", ordersSchema);
module.exports = OrderModel;
