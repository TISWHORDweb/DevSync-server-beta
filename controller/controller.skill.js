const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const ModelProduct = require("../models/model.product");
const Joi = require("joi");
const ModelSkill = require("../models/model.userSkill");
const ModelUserSkill = require("../models/model.userSkill");


exports.allSkills = useAsync(async (req, res) => {

    try {
        const skill = await ModelSkill.find();
        return res.json(utils.JParser('All Skill fetch successfully', !!skill, skill));
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

exports.deleteSkills = useAsync(async (req, res) => {
    try {
        const ID = req.body.id
        if (!ID) return res.status(402).json(utils.JParser('provide the skill id', false, []));

        const skill = await ModelSkill.deleteOne({ _id: ID })
        return res.json(utils.JParser('Skills deleted successfully', !!skill, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});



exports.editSkill = useAsync(async (req, res) => {

    try {

        const _id = req.body.id
        const body = req.body

        if (!_id) return res.status(402).json(utils.JParser('provide the skill id', false, []));

        await ModelSkill.updateOne({ _id }, body).then(async () => {
            const skill = await ModelSkill.find({ _id });
            return res.json(utils.JParser('User skills update Successfully', !!skill, skill));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.singleSkill = useAsync(async (req, res) => {

    try {
        const _id = req.params.id

        const skill = await ModelSkill.findOne({ _id });
        res.json(utils.JParser('Skill fetch successfully', !!skill, skill));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

//////////////////////////////////////////////////////////////////////////////////
// USER SKILLS ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

exports.userSkill = useAsync(async (req, res) => {

    try {

        const userID = req.userID
        const body = req.body.body
        const skillID = req.body.skillID

        const check = await ModelUserSkill.findOne({skillID,userID})
        if(check) return res.json(utils.JParser(' This skill have been added before', false, []));

        const skill = await ModelUserSkill.insertMany(
            body.map((data) => ({ ...data, userID: userID }))
        );

        return res.json(utils.JParser('User Skill created successfully', !!skill, skill));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

})

exports.editUserSkill = useAsync(async (req, res) => {

    try {

        const _id = req.body.id
        const body = req.body

        if (!_id) return res.status(402).json(utils.JParser('provide the user skills id', false, []));

        await ModelUserSkill.updateOne({ _id }, body).then(async () => {
            const skill = await ModelUserSkill.find({ _id });
            return res.json(utils.JParser('User skills update Successfully', !!skill, skill));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.singleUserSkill = useAsync(async (req, res) => {

    try {
        const _id = req.params.id

        const skill = await ModelUserSkill.findOne({ _id });
        res.json(utils.JParser('User Skill fetch successfully', !!skill, skill));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allUserSkills = useAsync(async (req, res) => {

    try {
        const skill = await ModelUserSkill.find();
        return res.json(utils.JParser('All User Skill fetch successfully', !!skill, skill));
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

exports.deleteUserSkills = useAsync(async (req, res) => {
    try {
        const ID = req.body.id
        if (!ID) return res.status(402).json(utils.JParser('provide the user skill id', false, []));

        const skill = await ModelUserSkill.deleteOne({ _id: ID })
        return res.json(utils.JParser('User skills deleted successfully', !!skill, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});




