const { request } = require('express');
const jwt = require('jsonwebtoken')
const User = require("../Models/UserModel")
const requireAuth = async (req, res, next) => {

    // verify authen 
    const{authorization}  = req.headers; 

    if (!authorization) {
        return res.status(401).json({error: "Authorization token is required"})
    }

    // reomve bearer from jwt (2nd position needed)
    // attching properties to req for further api usage
    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        // attaching user id by taking token id to req
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth