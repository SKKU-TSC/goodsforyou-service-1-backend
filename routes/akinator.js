const router = require('express').Router();
const { getResult } = require('../controllers/akinator');

router.post('/', getResult);

module.exports = router;
