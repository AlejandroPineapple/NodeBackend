const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

const { getTareas, crearTareas, updateTareas, deleteTareas } = require('../controllers/tareasController')

// router.route('/').get(getTareas).post(crearTareas)

router.get('/', protect, getTareas)
router.post('/', protect, crearTareas)
router.put('/:id', protect, updateTareas)
router.delete('/:id', protect, deleteTareas)

module.exports = router