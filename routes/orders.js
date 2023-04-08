var express = require('express')
const { getAllOrders,AddnewOrder,getOrderById,updateOrderById,deleteOrder } = require('../controllers/order');
var router = express.Router()

// get all orders
router.get("/", async (req, res, next) => { 
    try{
        var newOrder = await getAllOrders();
        res.status(200).json(newOrder) 
    }
    catch (err){
        res.json({message: err.message})
    }
})

// get order by id
router.get("/:id",async (req,res,next)=>{
    var {id} = req.params
    try{
        var specificOrder = await getOrderById(id);
        res.status(200).json(specificOrder)
    }
    catch(err){
        res.json({message: err.message})
    }
})

// add new order
router.post("/", async (req, res, next) => {
    var seller = req.body
    try{
        var addededOrder = await AddnewOrder(seller);
        res.status(201).json(addededOrder)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }
    
})

// update order
router.patch("/:id",async (req, res,) => {
    var id = req.params.id
    var obj = req.body
    try{
        let updatedOrder = await updateOrderById(id,obj)
        res.json(updatedOrder)
    }
    catch (err){
        res.status(422).json({message: err.message})
    }

})

// delete order
router.delete("/:id", async (req,res)=>{
    var id = req.params.id
    try{
        let deletedSeller = await deleteOrder(id);
        res.json("Order Deleted Successfully")
    }
    catch (err){
        res.status(422).json({message: err.message})
    }   
});

module.exports = router

