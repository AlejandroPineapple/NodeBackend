const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { findOne } = require('../models/userModel')
const User = require('../models/userModel')

const register = asyncHandler( async (req, res) => {

    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error ('Te faltan datos papi')
    }

    const userExiste = await User.findOne({email})

    if(userExiste) {
        res.status(400)
        throw new Error('Eres un copion ese usuario ya existe')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await  User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
})

const login  = asyncHandler( async(req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else 
    {
        res.status(401)
        throw new Error('Credenciales incorrectas, papi')
    }
})

const generarToken = (idusuario) => {
    return jwt.sign({idusuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const showdata = asyncHandler( async(req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    register,
    login,
    showdata
}