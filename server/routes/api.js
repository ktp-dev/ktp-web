var router = require('express').Router(),
    authMiddleware = require('../middleware/auth.js'),
    configurationHandler = require('./api/configuration.js'),
    authHandler = require('./api/auth.js'),
    userHandler = require('./api/user.js'),
    adminHandler = require('./api/admin.js');

router.use('/auth', authHandler);
router.use('/user', authMiddleware('any', 'api', false), userHandler);
router.use('/configuration', configurationHandler);
router.use('/admin', authMiddleware('admin', 'api'), adminHandler);

module.exports = router;
