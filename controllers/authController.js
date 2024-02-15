const user = require('./../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup =  async (req, res) => {
    try{
        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })

        const token = jwt.sign({id:newUser._id,},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(201).json({
            status: "Success",
            data: {newUser, token}
        })
    }catch(err){
        res.status(400).json({
            status: "Fail",
            message: err.message
        })
    }
}