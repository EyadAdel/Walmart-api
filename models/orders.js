const mongoose = require("mongoose");
const productModel = require("../models/products");

const ordersSchema = mongoose.Schema(
  {
    // customerID: { type: mongoose.SchemaTypes.ObjectId }, // ID of the user who placed the order
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    items: [
      // an array of items in the order
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
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
      enum: ["Pending", "Confirmed", "Shipped", "Deliverd", "Cancelled"],
      default: "Pending",
    },
    // status: String, // current status of the order (e.g. "processing", "shipped", "delivered")
    // total_amount: Number, // total amount for the order
  },
  { timestamps: true }
);

// adding total price field
ordersSchema.virtual("totalPrice").get(async function () {
  let totalPrice = 0;
  for (const item of this.items) {
    const product = await productModel.findById(item.product);
    totalPrice += product.priceAfter * item.quantity;
  }
  return totalPrice;
});

const OrderModel = mongoose.model("orders", ordersSchema);
module.exports = OrderModel;
