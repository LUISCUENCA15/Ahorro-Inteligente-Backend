const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

async function registrarUsuario(datos) {
    const { nombre, correo, password } = datos;

    const existe = await Usuario.findOne({
        where: { correo }
    });

    if (existe) {
        throw new Error('El correo ya está registrado.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
        nombre,
        correo,
        password: passwordHash
    });

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
    };
}

async function loginUsuario(datos) {
    const { correo, password } = datos;

    const usuario = await Usuario.findOne({
        where: { correo }
    });

    if (!usuario) {
        throw new Error('Usuario no encontrado.');
    }

    const passwordValida = await bcrypt.compare(
        password,
        usuario.password
    );

    if (!passwordValida) {
        throw new Error('Contraseña incorrecta.');
    }

    const datosUsuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
    };

    const token = jwt.sign(
        {
            id: usuario.id,
            correo: usuario.correo,
            tipo: 'access'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    const refreshToken = jwt.sign(
        {
            id: usuario.id,
            correo: usuario.correo,
            tipo: 'refresh'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return {
        usuario: datosUsuario,
        token,
        refreshToken
    };
}

async function renovarToken(refreshToken) {
    if (!refreshToken) {
        throw new Error('Refresh token no proporcionado.');
    }

    let decoded;

    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
        );
    } catch (error) {
        throw new Error('Refresh token inválido o expirado.');
    }

    if (decoded.tipo !== 'refresh') {
        throw new Error('Token no válido para renovación.');
    }

    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
        throw new Error('Usuario no encontrado.');
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            correo: usuario.correo,
            tipo: 'access'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    return {
        token
    };
}

module.exports = {
    registrarUsuario,
    loginUsuario,
    renovarToken
};