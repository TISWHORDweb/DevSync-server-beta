const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const ModelProduct = require("../models/model.product");
const Joi = require("joi");
const ModelSkill = require("../models/model.userSkill");
const ModelUserSkill = require("../models/model.userSkill");

exports.userSkill = useAsync(async (req, res) => {

    try {

        const userID = req.userID
        const body = req.body.body

        const skill = await ModelUserSkill.insertMany(
            body.map((data) => ({ ...data, userID: userID }))
        );

        return res.json(utils.JParser('User Skill created successfully', !!skill, skill));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

})

exports.skill = useAsync(async (req, res) => {

    try {

        const skill = req.body.skill
        const Check = await ModelSkill.findOne({ skill })
        
        if(Check)  return res.json(utils.JParser('Skill existed already', false, []));
        
        const body = req.body
        const data = await ModelSkill.create(body)

        return res.json(utils.JParser('Skill created successfully', !!data, data));

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

exports.getUserSkill = useAsync(async (req, res) => {

    try {

        const userID = req.userID

        const skill = await ModelUserSkill.find({ userID });
        return res.json(utils.JParser('User skill fetch successfully', !!skill, skill));
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

exports.allSkills = useAsync(async (req, res) => {

    try {
        const skill = await ModelSkill.find();
        return res.json(utils.JParser('All Skill fetch successfully', !!skill, skill));
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

