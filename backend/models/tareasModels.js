const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({

    descripcion: {
        type: String,
        required: [true, "Pon una descripcion papi"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)