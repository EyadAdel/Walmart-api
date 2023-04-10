const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProdudtByID,
  deleteProductByID,
} = require("../controllers/products");
const router = express.Router();

//Add New Product
router.post("/", addProduct);

//Get All Products
router.get("/", getAllProducts);

//To update in specific product (update in any field)
router.patch("/:id", updateProdudtByID);

//To Delete specific Product
router.delete("/:id", deleteProductByID);

module.exports = router;
