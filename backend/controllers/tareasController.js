const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModels')

const getTareas = asyncHandler( async(req, res) => {

    const tareas = await Tarea.find({user: req.user.id})
    res.status(420).json({tareas})
})

const crearTareas = asyncHandler( async(req, res) => {

    if(!req.body.descripcion) {
        res.status(400)
        throw new Error('Pon una descripcion papi')
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion,
        user: req.user.id
    })

    res.status(201).json(tarea)
})

const updateTareas = asyncHandler( async(req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea) {
        res.status(404)
        throw new Error('Te mereces el gatito malo, la tarea no existe')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(tareaUpdated)
})

const deleteTareas = asyncHandler( async(req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea) {
        res.status(404)
        throw new Error('Te mereces el gatito malo, la tarea no existe')
    }

    await Tarea.deleteOne(tarea)

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}