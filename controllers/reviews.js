const reviewModel = require("../models/reviews");

const createdReview = async (req, res, next) => {
  try {
    const reviewToBeAdded = req.body;
    const createdReview = await reviewModel.create(reviewToBeAdded);
    res.status(200).json(createdReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const allReviews = await reviewModel.find();
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProductReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allProductReviews = await reviewModel
      .find({ productID: id })
      .populate("authorID", "firstName");
    res.status(200).json(allProductReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSellerReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allSellerReviews = await reviewModel
      .find({ sellerID: id })
      .populate("authorID", "firstName");
    res.status(200).json(allSellerReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatedReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const updatedReview = await reviewModel.findByIdAndUpdate(id, obj, {
      new: true,
    });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletedReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await reviewModel.deleteOne({ _id: id });
    res.status(200).json(deletedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProductReviews,
  getAllSellerReviews,
  createdReview,
  getAllReviews,
  updatedReview,
  deletedReview,
};
