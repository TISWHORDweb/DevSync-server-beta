const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const Joi = require("joi");
const ModelCategory = require("../models/model.category");
const ModelPost = require("../models/model.post");



exports.category = useAsync(async (req, res) => {

    try {

        const userID = req.userID

        //create data if all data available
        const schema = Joi.object({
            name: Joi.string().min(1).required(),
        })

        //capture data
        const { name } = req.body;

        //validate data
        const validator = await schema.validateAsync(req.body);

        validator.adminID = userID

        const category = await ModelCategory.create(validator)
        return res.json(utils.JParser('Category created successfully', !!category, category));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

})

exports.allCategory = useAsync(async (req, res) => {

    try {
        const category = await ModelCategory.find();
        return res.json(utils.JParser('All Categories fetch successfully', !!category, category));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.CategoryPosts = useAsync(async (req, res) => {

    try {
        const categoryID = req.params.id

        const category = await ModelPost.find({ categoryID });

        if(!category){
           return res.json(utils.JParser('No post for into this category', false, category));
        }
        
        res.json(utils.JParser('Post comment fetch successfully', !!category, category));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})