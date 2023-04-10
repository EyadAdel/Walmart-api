const express = require('express');
const customerModel= require('../models/customer');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");

//To Create new Customer
router.post('/', async (req, res, next) => {
    try {
        const customerData = req.body;
        const newCustomer = await customerModel.create(customerData);
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Get all customers
router.get('/', async (req, res, next) => {
    try {
        const customersEmail = await customerModel.find({});
        res.status(200).json(customersEmail)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Get sepcific customer by email 
router.get('/:email', async (req, res, next) => {
    try {
        const {email} = req.params;
        const customersEmail = await customerModel.find({email});
        res.status(200).json(customersEmail)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Update in any field of specific customer by Id
router.patch('/:id', async (req, res, next) => {
    try {
        const obj = req.body;
        const {id}= req.params
        const updateFirstNameOfCustomer = await customerModel.findByIdAndUpdate(id,obj, { new: true })
        res.status(200).json(updateFirstNameOfCustomer)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Delete specific customer by id
router.delete('/:id', async (req, res, next) => {
    try {
        const {id}= req.params
        const deletedCustomer = await customerModel.deleteOne({_id:id})
        res.status(200).json("Customer deleted successfully")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Customer login
router.post('/login', async (req, res, next) => {
    try{
        const { email, password } = req.body
        const customer = await customerModel.findOne({email})
        if (customer) {
            const validPassword = bcrypt.compareSync(password, customer.password);
            if (validPassword) {  
                //Generate Token
                var token= jwt.sign({
                    customerID: customer._id,
                    email: customer.email
                },process.env.SECRET)
                res.status(200 ).json(token);
            } else {
                res.status(401).json('Invalid Email or Password');
            }
        } else {
            res.status(401).json('Email not found')
        }
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports = router;