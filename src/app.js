const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const authRoutes = require('./routes/authRoutes');

const movimientoRoutes = require('./routes/movimientoRoutes');

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use('/api/movimientos', movimientoRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        proyecto: "Ahorro Inteligente",
        version: "1.0.0",
        estado: "API funcionando correctamente 🚀"
    });
});

module.exports = app;