const express = require('express');
const router = express.Router();

const { searchDrugs, getRecalls } = require('../controllers/drugController');

router.get('/search', searchDrugs);
router.get('/recalls/:drugName', getRecalls)

module.exports = router;


