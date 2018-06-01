const router = require('express').Router();
const path = require('path');
const portalHandler = require('./portal.js');

router.get('/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/logo.png'));
});

router.use('/portal', portalHandler);

module.exports = router;
