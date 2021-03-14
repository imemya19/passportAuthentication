const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/home_controller');

router.get('/', HomeController.home);
router.use('/users', require('./user_routes'));
module.exports = router;