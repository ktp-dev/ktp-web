const router = require('express').Router();
const adminHandler = require('./portal/admin.js');

router.use('/admin', adminHandler);

module.exports = router;
