/**
 * 
 */
const {bodyParser} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');
const { AdminRegister, AdminLogin, UserRegister, UesrLogin } = require('../controller/controller.auth');

/**
 * auth routes
 */

// ADMIN
router.post('/admin/register', bodyParser, UserRegister);
router.post('/admin/login', bodyParser, UesrLogin);


/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;