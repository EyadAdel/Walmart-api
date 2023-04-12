const productModel = require("../models/products");
const cloudinary = require("cloudinary");

const addProduct = async (req, res, next) => {
  try {
    // if (req.role === "seller" || req.role === "admin") {
    const product = new productModel({
      ...req.body,
      // sellerID: req.seller?._id || req.admin._id,
    });

    // adding photos to cloudinary
    if (req.files) {
      const files = req.files.photos;
      const urls = [];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          public_id: `${Date.now()}`,
          resource_type: "auto",
          folder: "images",
        });
        urls.push(result.url);
      }
      product.photos = urls;
      product.mainPhoto = product.photos[0];
    }

    const result = await product.save();
    res.status(201).json(result);
    // } else {
    //   res.status(500).json({ error: "create seller account" });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by department
const getProductByDept = async (req, res, next) => {
  try {
    const products = await productModel.find({
      $or: [
        { departmentID: req.params.id },
        { subDepartmentID: req.params.id },
        { nestedSubDepartment: req.params.id },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

const updateProdudtByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { obj } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: id },
      { obj }
    );

    // adding photos to cloudinary
    if (req.files) {
      const files = req.files.photos;
      const urls = [];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          public_id: `${Date.now()}`,
          resource_type: "auto",
          folder: "images",
        });
        urls.push(result.url);
      }
      updatedProduct.photos = urls;
      updatedProduct.mainPhoto = updatedProduct.photos[0];
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProductByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productModel.deleteOne({ _id: id });
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductByDept,
  updateProdudtByID,
  deleteProductByID,
};
