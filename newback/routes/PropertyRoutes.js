const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');

// GET all properties
router.get('/', PropertyController.getAll);

// GET a single property by ID
router.get('/:id', PropertyController.getById);

// CREATE a new property
router.post('/', PropertyController.create);

// UPDATE a property by ID
router.put('/:id', PropertyController.update);

// DELETE a property by ID
router.delete('/:id', PropertyController.delete);

module.exports = router;
