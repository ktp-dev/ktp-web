const router = require('express').Router();
const authMiddleware = require('../middleware/auth.js');
const configurationHandler = require('./api/configuration.js');
const authHandler = require('./api/auth.js');
const userHandler = require('./api/user.js');
const adminHandler = require('./api/admin.js');

router.use('/auth', authHandler);
router.use('/user', authMiddleware('any', 'api', false), userHandler);
router.use('/configuration', configurationHandler);
router.use('/admin', authMiddleware('admin', 'api'), adminHandler);

module.exports = router;
