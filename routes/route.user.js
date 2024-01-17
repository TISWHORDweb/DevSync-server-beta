/**
 * 
 */
const express = require('express');
const router = express.Router();
const CoreError = require('../core/core.error');
const { usernameAvailabity } = require('../controller/controller.user');
const { userBodyGuard } = require('../middleware/middleware.protects');
const { post, allPost } = require('../controller/controller.post');
const { category, allCategory } = require('../controller/controller.category');

/**
 * Export lastly
 */

//USER
router.get('/username/:id', usernameAvailabity);

//POST
router.post('/post/create',userBodyGuard , post);
router.get('/post/all',userBodyGuard , allPost);

//CATEGORY
router.post('/category/create',userBodyGuard , category);
router.get('/category/all',userBodyGuard , allCategory);


router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;
