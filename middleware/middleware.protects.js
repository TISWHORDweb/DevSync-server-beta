/**
 * Slantapp code and properties {www.slantapp.io}
 */

const {errorHandle, useAsync, utils} = require('../core');
const CryptoJS = require("crypto-js");
const ModelUser = require('../models/model.user');

//body safe state
exports.bodyParser = (req, res, next) => {
    if (!Object.keys(req.body).length > 0) throw new errorHandle("the document body is empty", 202);
    else next();
}

//salesAgentbodyguard
exports.userBodyGuard = useAsync(async (req, res, next) => {
    const dToken =  req.headers['d-token'];
   
    if ( dToken === 'undefined') { res.status(401).json(utils.JParser("Unauthorized Access, Use a valid token and try again", false, [])); }

    //check and decode confirm code validity
    const isValid = await ModelUser.findOne({token: dToken});

    if (isValid) {
        //****** Decrypt Last Login Date and Time *******//
        const bytes = CryptoJS.AES.decrypt(isValid.lastLogin, process.env.SECRET_KEY);
        let lastLogin = bytes.toString(CryptoJS.enc.Utf8);

        //****** Convert to date from string *******//
        lastLogin = JSON.parse(lastLogin)
        lastLogin = new Date(lastLogin)

        //****** Calculate an hour ago in milliseconds *******//
        const oneHour = 60 * 60 * 1000; /* ms */

        //********** Throw error if token has expired (1hr) **************//
        if (((new Date) - lastLogin) > oneHour){ res.status(401).json(utils.JParser("Invalid or expired token, Use a valid token and try again", false, []));} 
        
        req.userID = isValid._id
        req.type = isValid.userType
        if (isValid.blocked === false) next();
        else return res.status(400).json(utils.JParser("token is valid but is not authorized for this route, Use a valid token and try again", false, []));
    } else res.status(400).json(utils.JParser("Invalid token code or token, Use a valid token and try again", false, []));
})