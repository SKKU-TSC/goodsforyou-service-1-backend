const router = require('express').Router();
const { getResult } = require('../controllers/akinator');

router.get('/', getResult);
