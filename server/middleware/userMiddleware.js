const mongoose = require('mongoose')
const user = mongoose.model("user")
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config/key')


module.exports =(req,res,next)=>{
    // console.log(req.headers)
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({err:"you must be logged in to view page"})
    }
    const token = authorization.replace("Bearer ","")
    console.log("token",token)
    jwt.verify(token,SECRET_KEY,(err,payload)=>{
        if(err){
           return res.status(401).json({error:"you must login first"})
        }
        const {_id,firstName,lastName} = payload
      
        user.findById(_id,firstName,lastName).then(userdata =>{
            req.User = userdata
            console.log("pay",userdata)
            next()
        })
        
    })
}