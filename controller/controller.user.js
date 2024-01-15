const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const Joi = require("joi");
const ModelUser = require("../models/model.user");

exports.usernameAvailabity = useAsync(async (req, res) => {

    try {
        const username = req.params.id
        const status = await ModelUser.findOne({ username });

        res.json(utils.JParser('Availability', !!status, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})