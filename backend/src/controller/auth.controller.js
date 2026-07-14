const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

async function registerUser (req, res) {
    const {username, email, password, role = "user"} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [             //returns if any one of 
                           //condition is statisfied
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist) {
        return res.status(409).json({
            message: "user aleary exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)
    //hashing //10: salt

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    
    res.status(201).json({
        message: "user registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

async function loginUser (req, res) {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password)

    if(!isPasswordvalid) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in ",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

async function logOutuser (req,res) {
    res.clearCookie("token")
        res.status(200).json({
            message: "user logged out"
        })
}

module.exports = {registerUser, loginUser, logOutuser}