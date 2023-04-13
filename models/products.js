const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique:true,
    },
    priceBefore: Number,
    priceAfter: { type: Number, required: true },
    brand: { type: String, required: true },
    quantity: Number,
    // colors: [
    //   {
    //     name: String, //red
    //     image: String, //img of product in specific color
    //   },
    // ],
    // size: [
    //   {
    //     val: Number, //32,38,40
    //     name: String, //Medium, large, xs
    //   },
    // ],
    variety: {
      colors: [String],
      sizes: [String],
    },
    // photos: { type: Array, required: true },
    photos: [
      {
        type: String,
      },
    ],
    mainPhoto: { type: String },
    badges: Array,
    tags: Array,
    productDetails: { type: String, required: true },
    specifications: [{ type: Object }],
    warranty: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    departmentID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "department",
      required: true,
    },
    subDepartmentID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    nestedSubDepartment: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    sellerID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "seller",
      required: true,
    },
  },
  { timestamps: true }
);

// delete product reviews when product removed
productSchema.pre("remove", async function (next) {
  const product = this;
  await Review.deleteMany({ productID: product._id });
  next();
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
