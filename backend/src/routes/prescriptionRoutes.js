const express = require('express');
const router = express.Router();
const {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription
} = require('../controllers/prescriptionController');
const { protect } = require('../middlewares/auth');
const authorize = require('../middlewares/roleCheck');

// All routes are protected
router.use(protect);

router.get('/', getPrescriptions);
router.get('/:id', getPrescription);

router.post('/', authorize('doctor'), createPrescription);
router.put('/:id', authorize('doctor'), updatePrescription);

module.exports = router;
