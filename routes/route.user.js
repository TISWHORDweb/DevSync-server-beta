/**
 * 
 */
const express = require('express');
const router = express.Router();
const CoreError = require('../core/core.error');
const { usernameAvailabity, editUser, getUser, singleUser, allUsers, deleteUser } = require('../controller/controller.user');
const { userBodyGuard } = require('../middleware/middleware.protects');
const { post, allPost } = require('../controller/controller.post');
const { category, allCategory } = require('../controller/controller.category');
const { like, allLikes, Checklike } = require('../controller/controller.like');

/**
 * Export lastly
 */

//USER
router.get('/user/username/:id', usernameAvailabity);
router.put('/user/edit',userBodyGuard , editUser);
router.get('/user',userBodyGuard , getUser);
router.get('/user/all',userBodyGuard , allUsers);
router.delete('/user/delete',userBodyGuard , deleteUser);
router.get('/user/:id',userBodyGuard , singleUser);

//POST
router.post('/post/create',userBodyGuard , post);
router.get('/post/all',userBodyGuard , allPost);

//CATEGORY
router.post('/category/create',userBodyGuard , category);
router.get('/category/all',userBodyGuard , allCategory);

//LIKE
router.get('/like/post/:postID',userBodyGuard , like);
router.get('/like/all',userBodyGuard , allLikes);
router.get('/like/post/check/:postID',userBodyGuard , Checklike);


router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;
