const express = require('express')
const router = express.Router()
// const ModelPerson = require("../../../models/mongoro/auth/mongoroUser_md")
// const AuditModel = require("../../../models/mongoro/auth/user/audit/audit_md")
const verify = require("../verifyToken")
const bcrypt = require('bcryptjs')
let multer = require('multer')
let fs = require('fs')
let path = require('path');
const address = require('address');
const CryptoJS = require("crypto-js")
const axios = require('axios')
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const sha1 = require('sha1');
dotenv.config()
const request = require('request');
// const GlobalModel = require('../../../models/mongoro/admin/super_admin/global/global_md')
const { notify } = require('../core/core.utils');
const { useAsync, utils, errorHandle, } = require('./../core');
// const MindCastFavourite = require('../models/model.favourites')
const { EmailNote } = require('../core/core.notify')
const ModelUser = require('../models/model.user')



exports.UserRegister = useAsync(async (req, res) => {

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 13)
    }

    try {
        if (!req.body.email  || !req.body.password || !req.body.username || !req.body.image ) return res.json(utils.JParser('please check the fields', false, []));

        req.body.token = sha1(req.body.email + new Date())
        req.body.lastLogin = CryptoJS.AES.encrypt(JSON.stringify(new Date()), process.env.SECRET_KEY).toString()

        const emailValidates = await ModelUser.findOne({ email: req.body.email })
        const usernameValidates = await ModelUser.findOne({ username: req.body.username })
        if (emailValidates) {
            return res.json(utils.JParser('There is another user with this email', false, []));
        }
        if(usernameValidates){
            return res.json(utils.JParser('There is another user with this username', false, []));
        } else {

            let user = await new ModelUser(req.body)

            await user.save().then(data => {

                data.password = "********************************"

                return res.json(utils.JParser('Congratulation Account created successfully', !!data, data));

            })
        }
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.UesrLogin = useAsync(async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const user = await ModelUser.findOne({ email: req.body.email })
        let blocked;
        let userPassword;
        let name;
        let body;
        let subject;

        if (user) {
            email= user.email;
            blocked = user.blocked;
            userPassword = user.password;
            name = user.fullName;
            body = "Login detected";
            subject = "Login Notification";

            //update user if regToken is passed
            if (!!req.body.token) await user.update({ token: req.body.token })

        } else {
            return res.json(utils.JParser("Invalid email or password", false, []));
        }
        
        if (blocked === true) {
            return res.json(utils.JParser('Sorry your account is blocked', false, []));
        }

        if (userPassword) {
            const originalPassword = await bcrypt.compare(req.body.password, userPassword);

            if (!originalPassword) {
                return res.json(utils.JParser('Wrong password', false, []));
            } else {

                const token = sha1(req.body.email + new Date())
                const lastLogin = CryptoJS.AES.encrypt(JSON.stringify(new Date()), process.env.SECRET_KEY).toString()

                await ModelUser.updateOne({ _id: user._id }, { $set: {token: token, lastLogin: lastLogin } }).then(() => {
                    EmailNote(email,name,body,subject)
                    user.token = token
                    return res.json(utils.JParser('logged in successfuly', true,  user ));
                })
            }
        }
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

// exports.userEmailVerify = useAsync(async (req, res) => {
//     try {

//         const user = await ModelPerson.findOne({ email: req.body.email });

//         if (user) {
//             return res.json(utils.JParser('Email taken already', false, []));
//         } else {
//             return res.json(utils.JParser('Email available', true, []));
//         }

//     } catch (e) {
//         throw new errorHandle(e.message, 400)
//     }
// })


// exports.updatePassword = useAsync(async (req, res) => {

//     const user = await ModelPerson.findOne({ email: req.body.email });

//     try {
//         if (!req.body.email) return res.status(400).json({ msg: 'provide the id ?', status: 400 })

//         if (!user) {
//             return res.json(utils.JParser('No User is registered with this id', true, []));
//         }

//         const NewPassword = await bcrypt.hash(req.body.password, 13)
//         await ModelPerson.updateOne({ email: req.body.email }, { password: NewPassword }).then(async () => {
//             // const New = await ModelPerson.findOne({ email: req.body.email });
//             return res.json(utils.JParser('Password changed Successfully ', true, []));

//         }).catch((err) => {
//             res.send(err)
//         })

//     } catch (e) {
//         throw new errorHandle(e.message, 400)
//     }

// })