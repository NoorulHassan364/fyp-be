const express = require('express');
const admissionController = require("../../controllers/admissionController");

const router = express.Router();

router.post('/checkout-session/:collegeId/:studentId', admissionController.getCheckOutSession)
router.get('/:id', admissionController.userAdmissions)
router.get('/admissionDetail/:id', admissionController.admissionDetail)
router.get('/college/:id', admissionController.getCollegeAdmissions)

module.exports = router;
