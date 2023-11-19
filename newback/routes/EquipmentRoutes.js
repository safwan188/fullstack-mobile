const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/EquipmentController');
const upload=require('../Middleware/multerConfig');
router.post('/', upload.single('equipmentImage'), equipmentController.createEquipment);
router.get('/', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
