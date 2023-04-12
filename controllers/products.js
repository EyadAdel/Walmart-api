const productModel = require("../models/products");

const addProduct = async (req, res, next) => {
  try {
    const productToBeAdded = req.body;
    const newProduct = await productModel.create(productToBeAdded);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
const getProductById = async (req,res,next)=>{
  const {id} = req.params;
  try{
      const specificProduct = await productModel.findById(id);
      res.status(200).json(specificProduct)
  }
  catch(err){
      res.json({message: err.message})
  }
}
const updateProdudtByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { obj } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: id },
      { obj }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteProductByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.deleteOne({ _id: id });
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProdudtByID,
  deleteProductByID,
};
