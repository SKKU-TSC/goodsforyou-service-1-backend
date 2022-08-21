const router = require('express').Router();
const { createItem } = require('../controllers/item');

router.post('/', createItem);

module.exports = router;
