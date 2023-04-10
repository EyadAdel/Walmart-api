const express = require("express");
const {
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

//To update Review
router.patch("/:id", updatedReview);

//To Delete Review
router.delete("/:id", deletedReview);

module.exports = router;
