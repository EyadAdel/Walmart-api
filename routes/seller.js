var express = require("express");
var {
  getAllSellers,
  AddnewSeller,
  getSellerById,
  updateSellerById,
  deleteSeller,
  loginSeller,
} = require("../controllers/seller");
var router = express.Router();

// get all sellers
router.get("/", getAllSellers);

// Get seller by id
router.get("/:id", getSellerById);

// Login a seller
router.post("/login", loginSeller);

// add new seller
router.post("/", AddnewSeller);

// Update seller
router.patch("/:id", updateSellerById);

// Delete Seller
router.delete("/:id", deleteSeller);

module.exports = router;
