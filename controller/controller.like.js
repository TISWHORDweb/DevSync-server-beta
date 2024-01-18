const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const Joi = require("joi");
const ModelPost = require("../models/model.post");
const ModelLike = require("../models/model.like");

exports.like = useAsync(async (req, res) => {

    try {

        const userID = req.userID
        const postID = req.params.postID

        const like = await ModelLike.findOne({ userID: userID, postID: postID })
        const post = await ModelPost.findOne({ _id: postID })
        let LikeStatus;
        const likes = post.like

        if (like) {

            const body = { like: likes - 1 }
            LikeStatus = 1
            await ModelPost.updateOne({ _id: postID }, body).then(async () => {
                await ModelLike.deleteOne({ _id: like._id })
                const post = await ModelPost.findOne({ _id: postID });
                return res.json(utils.JParser('Post unliked successfully', true, { LikeStatus, post }));
            })

        } else {
            const data = {
                userID,
                postID
            }
            const body = { like: +likes + +1 }
            LikeStatus = 2
            await ModelPost.updateOne({ _id: postID }, body).then(async () => {
                const liked = await ModelLike.create(data)
                const post = await ModelPost.findOne({ _id: postID });
                return res.json(utils.JParser('Post liked successfully', !!liked, { LikeStatus, post }));
            })

        }
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

})

exports.Checklike = useAsync(async (req, res) => {

    try {

        const userID = req.userID
        const postID = req.params.postID

        const like = await ModelLike.findOne({ userID: userID, postID: postID })
        let LikeStatus;

        if (!like) {
            LikeStatus = 1
            return res.json(utils.JParser('Like', false, LikeStatus));
        } else {
            LikeStatus = 2
            return res.json(utils.JParser('Liked', true, LikeStatus));
        }
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

})

exports.editProduct = useAsync(async (req, res) => {

    try {

        const productID = req.body.id
        const body = req.body

        if (!productID) return res.status(402).json(utils.JParser('provide the Product id', false, []));

        await ModelProduct.updateOne({ _id: productID }, body).then(async () => {
            const product = await ModelProduct.find({ _id: productID });
            return res.json(utils.JParser('Product update Successfully', !!product, product));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allLikes = useAsync(async (req, res) => {

    try {
        const like = await ModelLike.find();
        return res.json(utils.JParser('All Likes fetch successfully', !!like, like));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.getAdminProduct = useAsync(async (req, res) => {

    try {

        const adminID = req.adminID

        const product = await ModelProduct.find({ adminID: adminID });
        return res.json(utils.JParser('Product fetch successfully', !!product, product));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.singleProduct = useAsync(async (req, res) => {

    try {
        const productID = req.params.id

        const product = await ModelProduct.findOne({ productID: productID });

        if (!product) {
            const product = await ModelProduct.findOne({ _id: productID })
            return res.json(utils.JParser('Product fetch successfully', !!product, product));
        }

        res.json(utils.JParser('Product fetch successfully', !!product, product));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allPost = useAsync(async (req, res) => {

    try {
        const post = await ModelPost.find();
        return res.json(utils.JParser('All Posts fetch successfully', !!post, post));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.deleteProduct = useAsync(async (req, res) => {
    try {
        const productID = req.body.id
        if (!productID) return res.status(402).json(utils.JParser('provide the product id', false, []));

        const product = await ModelProduct.deleteOne({ _id: productID })
        return res.json(utils.JParser('Product deleted successfully', !!product, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});

