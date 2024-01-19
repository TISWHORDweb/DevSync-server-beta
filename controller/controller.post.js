const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const Joi = require("joi");
const ModelPost = require("../models/model.post");
const ModelUser = require("../models/model.user");
const ModelCategory = require("../models/model.category");

exports.post = useAsync(async (req, res) => {

    try {

        const userID = req.userID

        //create data if all data available
        const schema = Joi.object({
            title: Joi.string().min(1).required(),
            categoryID: Joi.string().min(1).required(),
            description: Joi.string().min(1).required(),
            image: Joi.optional(),
            adminID: Joi.optional(),
        })

        //capture data
        const { title, categoryID, description } = req.body;

        //validate data
        const validator = await schema.validateAsync(req.body);

        validator.userID = userID

        const post = await ModelPost.create(validator)
        return res.json(utils.JParser('Post created successfully', !!post, post));

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

        const posts = await ModelPost.find()
            .populate({
                path: "userID",
                model: ModelUser,
                select: "_id username image ",
            }).populate({
                path: "categoryID",
                model: ModelCategory,
                select: "_id name ",
            });

        return res.json(utils.JParser('All Posts fetch successfully', false, posts.reverse()));
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

