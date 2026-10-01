const NodeCache = require('node-cache');

// Tiempo de vida de la caché: 60 segundos
const cache = new NodeCache({
    stdTTL: 60,
    checkperiod: 120
});

module.exports = cache;