const User = require ('../models/UserModel')
const mongoose = require('mongoose')


//Get all user
exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.find()
        res.json({users})
    } catch (error) {
        
    }
}

// delete user 
exports.deleteUser = async (req,res) => {
    try {
        const id= req.params.id ;
        const user = await User.findByIdAndDelete(id)
        res.json({message: " User deleted"})
    } catch (error) {
        
    }
}

//Update role user

exports.updateUser = async (req,res) => {
    try {
        const id= req.params.id ;
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.json({user, message: 'user updated successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

