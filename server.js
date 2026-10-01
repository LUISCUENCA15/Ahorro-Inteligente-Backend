require('dotenv').config();

const app = require('./src');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {

    try {

        await sequelize.authenticate();

        console.log("✅ Conexión con MySQL establecida.");

        await sequelize.sync();

        console.log("✅ Tablas sincronizadas.");

        app.listen(PORT, () => {

            console.log("====================================");
            console.log("🚀 API Ahorro Inteligente");
            console.log(`🌐 http://localhost:${PORT}`);
            console.log("====================================");

        });

    } catch (error) {

        console.error("Error completo:", error.message);

    }

}

iniciarServidor();