const express = require("express");
const {
  addProduct,
  getAllProducts,
  getAllActiveProducts,
  changeProductActivity,
  getProductByID,
  getProductByDept,
  getProductBySeller,
  getActiveProductBySeller,
  updateProdudtByID,
  deleteProductByID,
} = require("../controllers/products");
const router = express.Router();
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

//Get All Products
router.get("/all", getAllProducts);

//Get All Active Products
router.get("/", getAllActiveProducts);

//change product activity
router.put("/activity/:id", changeProductActivity);

//Get Products by id
router.get("/:id", getProductByID);

// Get a product by Department
router.get("/dept/:id", getProductByDept);

// Get all product by seller
router.get("/seller/all/:id", getProductBySeller);

// Get the products by seller
router.get("/seller/:id", getActiveProductBySeller);

//To Delete specific Product
router.delete("/:id", deleteProductByID);

// handle cloudinary middleware in routes that need to upload photos
router.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

cloudinary.config({
  cloud_name: "dkqlixc3e",
  api_key: "231758734662455",
  api_secret: "qcuo5tmrZrAUuD9IMsURHfJxqx8",
});

//Add New Product
router.post("/", addProduct);

//To update in specific product (update in any field)
router.patch("/:id", updateProdudtByID);

module.exports = router;
