const authService = require('../services/authService');

async function register(req, res) {
    try {
        const usuario =
            await authService.registrarUsuario(req.body);

        res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

async function login(req, res) {
    try {
        const resultado =
            await authService.loginUsuario(req.body);

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso.",
            ...resultado
        });

    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
}

async function refresh(req, res) {
    try {
        const { refreshToken } = req.body;

        const resultado =
            await authService.renovarToken(
                refreshToken
            );

        res.status(200).json(resultado);

    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
}

module.exports = {
    register,
    login,
    refresh
};