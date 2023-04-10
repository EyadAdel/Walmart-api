var express = require('express')
var {getAllSellers,AddnewSeller,getSellerById,updateSellerById,deleteSeller} = require('../controllers/seller')
var router = express.Router()

// get all sellers
router.get("/", getAllSellers)

// add new seller
router.post("/",AddnewSeller)

// Get seller by id
router.get("/:id",getSellerById)

// Update seller
router.patch("/:id",updateSellerById)

// Delete Seller
router.delete("/:id", deleteSeller);

module.exports = router

