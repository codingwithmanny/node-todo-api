const router = require('express').Router();

// ROUTES
router.post('/login', require('./login'));
router.post('/register', require('./register'));

// EXPORTS
module.exports = router;
