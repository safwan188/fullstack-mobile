
const express = require('express');
const router = express.Router();

const expertController = require('../controllers/ExpertController');
const authJwt = require('../Middleware/auth');
// GET all experts
router.get('/', expertController.getAllExperts);
router.get('/expertbytz',[  authJwt.verifyToken], expertController.getExpertBytz);
// GET a single expert by ID
router.get('/:id', expertController.getExpertById);
router.post('/createMultipleExperts', expertController.createMultipleExperts);
// CREATE a new expert
router.post('/', expertController.createExpert);

// UPDATE an existing expert by ID
router.put('/:id', expertController.updateExpertById);

// DELETE an expert by ID
router.delete('/:id', expertController.deleteExpertById);


module.exports = router;
