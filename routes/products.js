const express = require('express');
const productModel = require('../models/products');
const router = express.Router();


//Add New Product
router.post('/', async (req, res, next) => {
    try {
        const productToBeAdded = req.body
        const newProduct = await productModel.create(productToBeAdded)
        res.status(200).json(newProduct)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Get All Products
router.get('/', async (req, res, next) => {
    try {
        const allProducts = await productModel.find();
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//To update in specific product (update in any field)
router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {obj}= req.body
        const updatedProduct = await productModel.findByIdAndUpdate({_id:id},{obj});
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//To Delete specific Product
router.delete('/:id', async (req,res,next)=>{
    try{
        const {id}= req.params
        const deletedProduct= await productModel.deleteOne({_id:id});
        res.status(200).json("Product deleted successfully")
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;