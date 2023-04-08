var express = require('express')
var {getAllSellers,AddnewSeller,getSellerById,updateSellerById,deleteSeller} = require('../controllers/seller')
var router = express.Router()

// get all sellers
router.get("/", async (req, res, next) => { 
    try{
        var newSeller = await getAllSellers();
        res.status(200).json(newSeller) 
    }
    catch (err){
        res.json({message: err.message})
    }
})

// get seller by id
router.get("/:id",async (req,res,next)=>{
    var {id} = req.params
    try{
        var specificSeller = await getSellerById(id);
        res.status(200).json(specificSeller)
    }
    catch(err){
        res.json({message: err.message})
    }
})

// add new seller
router.post("/", async (req, res, next) => {
    var seller = req.body
    try{
        var addededSeller = await AddnewSeller(seller);
        res.status(201).json(addededSeller)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }
    
})

// update seller
router.patch("/:id",async (req, res,) => {
    var id = req.params.id
    var obj = req.body
    try{
        let updatedSeller = await updateSellerById(id,obj)
        res.json(updatedSeller)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

})

// delete Seller
router.delete("/:id", async (req,res)=>{
    var id = req.params.id
    try{
        let deletedSeller = await deleteSeller(id);
        res.json("Seller Deleted Successfully")
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
});

module.exports = router

