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


exports.editUser = useAsync(async (req, res) => {

    try {

        const userID = req.body.id
        const body = req.body

        if (!userID) return res.status(402).json(utils.JParser('provide the user id', false, []));

        await ModelUser.updateOne({ _id: userID }, body).then(async () => {
            const user = await ModelUser.find({ _id: userID });
            return res.json(utils.JParser('User updated Successfully', !!user, user));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.getUser = useAsync(async (req, res) => {

    try {

        const userID = req.userID

        const user = await ModelUser.find({ _id: userID });
        return res.json(utils.JParser('User fetch successfully', !!user, user));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.singleUser = useAsync(async (req, res) => {

    try {
        const userID = req.params.id

        const user = await ModelUser.findOne({ _id: userID });
        res.json(utils.JParser('User fetch successfully', !!user, user));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allUsers = useAsync(async (req, res) => {

    try {
        const user = await ModelUser.find();
        return res.json(utils.JParser('All User fetch successfully', !!user, user));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.deleteUser = useAsync(async (req, res) => {
    try {
        const userID = req.body.id
        if (!userID) return res.status(402).json(utils.JParser('provide the user id', false, []));

        const user = await ModelUser.deleteOne({ _id: userID })
        return res.json(utils.JParser('User deleted successfully', !!user, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});

