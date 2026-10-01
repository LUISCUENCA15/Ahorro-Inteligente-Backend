const express = require('express');

const router = express.Router();

const movimientoController = require('../controllers/movimientoController');

const { verificarToken } = require('../middleware/authMiddleware');


router.post(
    '/',
    verificarToken,
    movimientoController.crearMovimiento
);


router.get(
    '/',
    verificarToken,
    movimientoController.obtenerMovimientos
);


module.exports = router;