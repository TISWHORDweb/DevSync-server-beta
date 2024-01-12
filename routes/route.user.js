/**
 * 
 */
const express = require('express');
const router = express.Router();
const CoreError = require('../core/core.error');

/**
 * Export lastly
 */



router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;
