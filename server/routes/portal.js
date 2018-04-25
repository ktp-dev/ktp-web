var router = require('express').Router(),
    adminHandler = require('./portal/admin.js');

router.use('/admin', adminHandler);

module.exports = router;
