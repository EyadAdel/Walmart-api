const express = require('express');
const reviewModel = require('../models/reviews');
const router = express.Router();

//Create Review
router.post('/', async (req, res, next) => {
    try {
        const reviewToBeAdded = req.body
        const createdReview = await reviewModel.create(reviewToBeAdded)
        res.status(200).json(createdReview)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Get All Reviews
router.get('/', async (req, res, next) => {
    try {
        const allReviews = await reviewModel.find();
        res.status(200).json(allReviews)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//To update Review
router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const obj= req.body
        const updatedReview = await reviewModel.findByIdAndUpdate(id, obj, {new: true});
        res.status(200).json(updatedReview)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//To Delete Review
router.delete('/:id', async (req,res,next)=>{
    try{
        const {id}= req.params
        const deletedReview= await reviewModel.deleteOne({_id:id});
        res.status(200).json(deletedReview)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;