const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Teclea un nombre, papi"]
    },
    email: {
        type: String,
        required: [true, "Teclea un email, papi"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Pon tu contraseña, papi"]
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)