// Dependencies
const router = require('express').Router();
const auth = require('./auth');
const todos = require('./todos');

// ROUTES
router.use('/auth', auth);
router.use('/todos', todos);

// EXPORTS
module.exports = router;
