const sequelize = require('../config/database');

const Usuario = require('./Usuario');
const Movimiento = require('./Movimiento');

// Un usuario tiene muchos movimientos
Usuario.hasMany(Movimiento, {
    foreignKey: 'usuario_id',
    as: 'movimientos'
});

// Cada movimiento pertenece a un usuario
Movimiento.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});

module.exports = {
    sequelize,
    Usuario,
    Movimiento
};