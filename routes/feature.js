const router = require('express').Router();
const { createFeature, addItemToFeature } = require('../controllers/feature');

router.post('/', createFeature);

router.patch('/item', addItemToFeature);

module.exports = router;
