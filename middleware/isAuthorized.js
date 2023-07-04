const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env

exports.isAuthorized = async(req,res,next)=>{
    try{
        const token =  req.header('Authorization').replace('Bearer ',"")

    
        if(!token){
            return res.status(401).send({
                success: false,
                message: "Unauthorize user "
            })
        }

        const decode = jwt.verify(token,SECRET_KEY)
        req.user = decode.userId


        next();
    }

    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}


