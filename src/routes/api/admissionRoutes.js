const express = require('express');
const admissionController = require("../../controllers/admissionController");

const router = express.Router();

router.post('/checkout-session/:collegeId/:studentId', admissionController.getCheckOutSession)

module.exports = router;
