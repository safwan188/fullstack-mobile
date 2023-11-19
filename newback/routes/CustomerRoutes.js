// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');
const authJwt = require('../Middleware/auth');
const { generatePDF } = require('../Middleware/pdfgenerator'); // Use correct path to your generatePDF function
const fs = require('fs');

// Create a new customer
router.post('/', customerController.createCustomer);
router.post('/customerandproperty', customerController.createCustomerAndProperty);
router.post('/customerandpropertymany', customerController.createMultipleCustomersAndProperties);

// Retrieve all customers
router.get('/',[authJwt.verifyToken], customerController.getAllCustomers);

// Retrieve a single customer by ID
router.get('/:id', customerController.getCustomerById);

// Retrieve properties by customer ID
router.get('/:id/properties', customerController.getPropertyByCustomer);


// Update a customer by ID
router.put('/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
