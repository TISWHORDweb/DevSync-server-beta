const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const ModelComment = require("../models/model.comment");


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
        const body = req.body
        const comment = await ModelComment.create(body)

        return res.json(utils.JParser('Comment created successfully', !!comment, comment));

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

        const comment = await ModelComment.findOne({ postID });
        res.json(utils.JParser('Post comment fetch successfully', !!comment, comment));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})
