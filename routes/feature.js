const router = require('express').Router();
const { createFeature, addItemsToFeature } = require('../controllers/feature');

router.post('/', createFeature);

router.patch('/item', addItemsToFeature);

module.exports = router;
