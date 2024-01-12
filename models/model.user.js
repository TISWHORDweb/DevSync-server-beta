const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    phone: {
        type: String,
    },
    image: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    about: {
        type: String,
    },
    stack: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedln: {
        type: String,
    },
    youtube: {
        type: String,
    },
    github: {
        type: String,
    },
    twitter: {
        type: String,
    },
    facebook: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    lastLogin: {
        type: String,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    setuped: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: String,
    },
    userType: { type: Number, default: 1, },
    creationDateTime: { type: Number, default: () => Date.now() },
    updated_at: { type: Number, default: () => Date.now() }
})


const ModelUser = mongoose.model("model-user", userSchema)

module.exports = ModelUser