const express = require("express");
const {
  getAllProductReviews,
  getAllSellerReviews,
  createdReview,
  getAllReviews,
  updatedReview,
  deletedReview,
} = require("../controllers/reviews");
const router = express.Router();

//Create Review
router.post("/", createdReview);

//Get All Reviews
router.get("/", getAllReviews);

//Get All product Reviews
router.get("/product/:id", getAllProductReviews);

//Get All seller Reviews
router.get("/seller/:id", getAllSellerReviews);

//To update Review
router.patch("/:id", updatedReview);

//To Delete Review
router.delete("/:id", deletedReview);

module.exports = router;
