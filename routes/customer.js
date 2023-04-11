const express = require('express');
const router = express.Router();
const { AddnewCustomer, getAllCustomers, getCustomerByEmail, updateCustomerById, deleteCustomerById, customerLogin } = require('../controllers/customer');

//To Create new Customer
router.post('/',AddnewCustomer);

//Get all customers
router.get('/', getAllCustomers);

//Get sepcific customer by email 
router.get('/:email', getCustomerByEmail);

//Update in any field of specific customer by Id
router.patch('/:id', updateCustomerById);

//Delete specific customer by id
router.delete('/:id', deleteCustomerById);

//Customer login
router.post('/login', customerLogin)

module.exports = router;