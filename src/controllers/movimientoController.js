const logger = require('../utils/logger');
const { Movimiento, Usuario } = require('../models');
const cache = require('../cache/cache');

async function crearMovimiento(req, res) {
    try {
        const { tipo, descripcion, monto, fecha } = req.body;

        const movimiento = await Movimiento.create({
            tipo,
            descripcion,
            monto,
            fecha,
            usuario_id: req.usuario.id
        });

        cache.del('movimientos_' + req.usuario.id);

        res.status(201).json({
            mensaje: 'Movimiento registrado correctamente.',
            movimiento
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

async function obtenerMovimientos(req, res) {
    try {
        const claveCache = 'movimientos_' + req.usuario.id;

        const datosCache = cache.get(claveCache);

        if (datosCache) {
            logger.info('movimientos_desde_cache');
            return res.status(200).json(datosCache);
        }

        logger.info('movimientos_desde_mysql');

        const movimientos = await Movimiento.findAll({
            where: {
                usuario_id: req.usuario.id
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nombre', 'correo']
                }
            ],
            order: [
                ['fecha', 'DESC']
            ]
        });

        const movimientosJSON = movimientos.map(function(movimiento) {
            return movimiento.toJSON();
        });

        cache.set(claveCache, movimientosJSON);

        res.status(200).json(movimientosJSON);

    } catch (error) {
        logger.error('error_obtener_movimientos', { errorType: error.name || 'Error' });

        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    crearMovimiento,
    obtenerMovimientos
};
