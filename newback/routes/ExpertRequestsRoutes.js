const express = require('express');
const router = express.Router();
const expertRequest = require('../controllers/ExpertRequestController');

router.post('/', expertRequest.createRequest);
router.get('/', expertRequest.getAllRequests);
router.get('/:id', expertRequest.getRequest);
router.put('/:id', expertRequest.updateRequest);
router.put('/:id/assignexpert', expertRequest.assignExpert);
router.delete('/:id', expertRequest.deleteRequest);

module.exports = router;
