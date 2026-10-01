function escribirLog(nivel, evento, datos = {}) {
    const registro = {
        timestamp: new Date().toISOString(),
        level: nivel,
        event: evento,
        ...datos
    };

    console.log(JSON.stringify(registro));
}

const logger = {
    info(evento, datos) {
        escribirLog('INFO', evento, datos);
    },

    error(evento, datos) {
        escribirLog('ERROR', evento, datos);
    }
};

module.exports = logger;
