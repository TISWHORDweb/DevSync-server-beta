const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const ModelComment = require("../models/model.comment");
const ModelPost = require("../models/model.post");


exports.allComents = useAsync(async (req, res) => {

    try {
        const comment = await ModelComment.find();
        return res.json(utils.JParser('All comment fetch successfully', !!comment, comment));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.Comment = useAsync(async (req, res) => {

    try {

        const userID = req.userID
        req.body.userID = userID
        const postID = req.body.postID

        if (!postID) return res.status(402).json(utils.JParser('provide the post id', false, []));

        const body = req.body
        const post = await ModelPost.findOne({ _id: postID })
        const PostComment = post.comment
        const comment = await ModelComment.create(body)

        const data = { comment: +PostComment + +1 }
        await ModelPost.updateOne({ _id: postID }, data).then(async () => {
            const post = await ModelPost.findOne({ _id: postID });
            console.log("in")
            return res.json(utils.JParser('Commented successfully', !!post, {comment,post}));
        })
        
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

})

exports.deleteComment = useAsync(async (req, res) => {
    try {
        const ID = req.body.id
        if (!ID) return res.status(402).json(utils.JParser('provide the comment id', false, []));

        const comment = await ModelComment.deleteOne({ _id: ID })
        return res.json(utils.JParser('Comment deleted successfully', !!comment, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});



exports.editComment = useAsync(async (req, res) => {

    try {

        const _id = req.body.id
        const body = req.body

        if (!_id) return res.status(402).json(utils.JParser('provide the comment id', false, []));

        await ModelComment.updateOne({ _id }, body).then(async () => {
            const comment = await ModelComment.find({ _id });
            return res.json(utils.JParser('Comment updated Successfully', !!comment, comment));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.singleComment = useAsync(async (req, res) => {

    try {
        const _id = req.params.id

        const comment = await ModelComment.findOne({ _id });
        res.json(utils.JParser('Comment fetch successfully', !!comment, comment));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.PostComments = useAsync(async (req, res) => {

    try {
        const postID = req.params.id

        const comment = await ModelComment.find({ postID });
        res.json(utils.JParser('Post comment fetch successfully', !!comment, comment));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})
