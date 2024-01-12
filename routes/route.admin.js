/**
 * 
 */
const { adminBodyGuard} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('../core/core.error');
const { product, singleProduct, allProduct, deleteProduct, editProduct, getAdminProduct } = require('../controller/controller.product');

/**
 * auth routes
 */


//PRODUCTS
router.post('/product/create',adminBodyGuard, product );
router.get('/products', adminBodyGuard, getAdminProduct  );
router.get('/product/single/:id', adminBodyGuard, singleProduct );
router.put('/product/edit',adminBodyGuard, editProduct  );
router.get('/product/all',adminBodyGuard, allProduct  );
router.delete('/product/delete',adminBodyGuard, deleteProduct  );

/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;
