const jwt = require('jsonwebtoken')
const User = require("../models/UserModel")

exports.isAuth = async (req, res, next)=>{
   try {
    const token = req.headers['x-auth']
  
    if(!token) return res.status(401).json("message: no access, please login first")
    const user =  jwt.verify(token, process.env.SECRET_KEY, async(err,decoded)=>{
        if(err) return res.status(401).json({message: "invalid token"})
        const currUser = await User.findById(decoded._id)
        req.user = currUser
        next()

    });

   } catch (error) {
    
   }
}