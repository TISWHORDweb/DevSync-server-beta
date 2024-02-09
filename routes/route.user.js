/**
 * 
 */
const express = require('express');
const router = express.Router();
const CoreError = require('../core/core.error');
const { usernameAvailabity, editUser, getUser, singleUser, allUsers, deleteUser } = require('../controller/controller.user');
const { userBodyGuard } = require('../middleware/middleware.protects');
const { post, allPost, getUserPosts, singlePost, getUserPostsID } = require('../controller/controller.post');
const { category, allCategory, CategoryPosts } = require('../controller/controller.category');
const { like, allLikes, Checklike } = require('../controller/controller.like');
const { userSkill, getUserSkill, skill, allSkills, deleteSkills, allUserSkills, singleSkill, singleUserSkill, editSkill, editUserSkill, deleteUserSkills } = require('../controller/controller.skill');
const { Comment, allComents, deleteComment, singleComment, editComment, PostComments } = require('../controller/controller.comment');

/**
 * Export lastly
 */

//USER
router.get('/user/username/:id', usernameAvailabity);
router.put('/user/edit' , editUser);
router.get('/user',userBodyGuard , getUser);
router.get('/user/all',userBodyGuard , allUsers);
router.delete('/user/delete',userBodyGuard , deleteUser);
router.get('/user/:id' , singleUser);

//POST
router.post('/post/create',userBodyGuard , post);
router.get('/post/all', allPost);
router.get('/post/user', userBodyGuard, getUserPosts);
router.get('/post/user/:id', getUserPostsID);
router.get('/post/:id', singlePost);

//CATEGORY
router.post('/category/create' , category);
router.get('/category/all' , allCategory);
router.get('/category/post/:id' , CategoryPosts);

//LIKE
router.get('/like/post/:postID',userBodyGuard , like);
router.get('/like/all',userBodyGuard , allLikes);
router.get('/like/post/check/:postID',userBodyGuard , Checklike);

// USER SKILL
router.post('/skill/user',userBodyGuard , userSkill);
router.get('/skill/user/:id' , getUserSkill);
router.get('/skill/users',userBodyGuard , allUserSkills);
router.get('/skill/user/:id',userBodyGuard , singleUserSkill);
router.delete('/skill/user/delete',userBodyGuard , deleteUserSkills);
router.put('/skill/user/edit',userBodyGuard , editUserSkill);

//SKILL
router.post('/skill',userBodyGuard , skill);
router.get('/skill/all' , allSkills);
router.get('/skill/:id',userBodyGuard , singleSkill);
router.delete('/skill/delete',userBodyGuard , deleteSkills);
router.put('/skill/edit',userBodyGuard , editSkill);

//COMMENTS
router.post('/comment',userBodyGuard , Comment);
router.get('/comment/all',userBodyGuard , allComents);
router.get('/comment/:id',userBodyGuard , singleComment);
router.get('/comment/post/:id' , PostComments);
router.delete('/comment/delete',userBodyGuard , deleteComment);
router.put('/comment/edit',userBodyGuard , editComment);


router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;
