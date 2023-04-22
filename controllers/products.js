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

//for admin dashboard
const getAllProducts = async (req, res, next) => {
  try {
    const { brand, minPrice, maxPrice, name, sortBy, sortOrder, page, limit } =
      req.query;

    const filters = {};
    if (brand) filters.brand = brand;
    if (minPrice) filters.priceAfter = { $gte: minPrice };
    if (maxPrice) filters.priceAfter = { $lte: maxPrice };
    if (name) filters.name = { $regex: name, $options: "i" };

    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const pageSize = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const totalProducts = await productModel.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await productModel
      .find(filters)
      // .populate("sellerID", "businessName")
      // .populate("departmentID", "name")
      // .populate("subDepartmentID", "name")
      // .populate("nestedSubDepartment", "name")
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      products,
      currentPage,
      totalPages,
      totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//for users website
const getAllActiveProducts = async (req, res, next) => {
  try {
    const { brand, minPrice, maxPrice, name, sortBy, sortOrder, page, limit } =
      req.query;

    const filters = {
      isActive: true,
    };
    if (brand) filters.brand = brand;
    if (minPrice) filters.priceAfter = { $gte: minPrice };
    if (maxPrice) filters.priceAfter = { $lte: maxPrice };
    if (name) filters.name = { $regex: name, $options: "i" };

    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const pageSize = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const totalProducts = await productModel.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await productModel
      .find(filters)
      // .populate("sellerID", "businessName")
      // .populate("departmentID", "name")
      // .populate("subDepartmentID", "name")
      // .populate("nestedSubDepartment", "name")
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      products,
      currentPage,
      totalPages,
      totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//for seller and admin
const changeProductActivity = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { isActive } = req.body;

    const product = await productModel.findByIdAndUpdate(
      productId,
      { isActive },
      { new: true }
    );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for seller dashboard
const getProductByID = async (req, res, next) => {
  try {
    const allProducts = await productModel
      .findById(req.params.id)
      .populate("sellerID", "businessName")
      .populate("departmentID", "name")
      .populate("subDepartmentID", "name")
      .populate("nestedSubDepartment", "name");
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//for users website
const getProductBySeller = async (req, res, next) => {
  try {
    const products = await productModel.find({
      sellerID: req.params.id,
    });
    // .populate("sellerID", "businessName")
    // .populate("departmentID", "name")
    // .populate("subDepartmentID", "name")
    // .populate("nestedSubDepartment", "name")
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getActiveProductBySeller = async (req, res, next) => {
  try {
    const products = await productModel.find({
      sellerID: req.params.id,
      isActive: true,
    });
    // .populate("sellerID", "businessName")
    // .populate("departmentID", "name")
    // .populate("subDepartmentID", "name")
    // .populate("nestedSubDepartment", "name")
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by department
const getProductByDept = async (req, res, next) => {
  try {
    const { brand, minPrice, maxPrice, name, sortBy, sortOrder, page, limit } =
      req.query;

    const filters = {
      $or: [
        { departmentID: req.params.id },
        { subDepartmentID: req.params.id },
        { nestedSubDepartment: req.params.id },
      ],
      isActive: true,
    };
    if (brand) filters.brand = brand;
    if (minPrice) filters.priceAfter = { $gte: minPrice };
    if (maxPrice) filters.priceAfter = { $gte: maxPrice };
    if (name) filters.name = { $regex: name, $options: "i" };

    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const pageSize = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const totalProducts = await productModel.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await productModel
      .find(filters)
      // .populate("sellerID", "businessName")
      // .populate("departmentID", "name")
      // .populate("subDepartmentID", "name")
      // .populate("nestedSubDepartment", "name")
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      products,
      currentPage,
      totalPages,
      totalProducts,
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
    const obj = req.body;
    console.log(id, obj);
    const updatedProduct = await productModel.findByIdAndUpdate(id, obj, {
      new: true,
    });

    // adding photos to cloudinary
    // if (req.files) {
    //   const files = req.files.photos;
    //   const urls = [];

    //   for (const file of files) {
    //     const result = await cloudinary.uploader.upload(file.tempFilePath, {
    //       public_id: `${Date.now()}`,
    //       resource_type: "auto",
    //       folder: "images",
    //     });
    //     urls.push(result.url);
    //   }
    //   updatedProduct.photos = urls;
    //   updatedProduct.mainPhoto = updatedProduct.photos[0];
    // }

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
  getAllActiveProducts,
  changeProductActivity,
  getProductByID,
  getProductBySeller,
  getActiveProductBySeller,
  getProductByDept,
  updateProdudtByID,
  deleteProductByID,
};
