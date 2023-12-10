const {sign,verify} = require("jsonwebtoken");

const config = require("../../config");

const genereateToken = (payload)=>sign(payload,config.jwtsecret,{expiresIn:"24h"});
const verifyToken = (payload,callback)=>verify(payload,config.jwtsecret,callback);

module.exports = {
    genereateToken,
    verifyToken,
}