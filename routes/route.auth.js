/**
 * 
 */
const {bodyParser} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');
const { AdminRegister, AdminLogin } = require('../controller/controller.auth');

/**
 * auth routes
 */

// ADMIN
router.post('/admin/register', bodyParser, AdminRegister);
router.post('/admin/login', bodyParser, AdminLogin);


/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;