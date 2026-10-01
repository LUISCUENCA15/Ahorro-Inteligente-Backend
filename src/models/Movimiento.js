const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movimiento = sequelize.define('Movimiento', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tipo: {
        type: DataTypes.ENUM('ingreso', 'gasto'),
        allowNull: false
    },

    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    monto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {

    tableName: 'movimientos',
    timestamps: true

});

module.exports = Movimiento;