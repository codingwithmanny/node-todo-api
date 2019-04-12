const router = require('express').Router();
const middleware = require('../../middleware/jwt');

// ROUTES
router.get('/', middleware, require('./list'));
router.post('/', middleware, require('./create'));
router.get('/:id', middleware, require('./read'));
router.put('/:id', middleware, require('./update'));
router.delete('/:id', middleware, require('./delete'));

// EXPORTS
module.exports = router;
