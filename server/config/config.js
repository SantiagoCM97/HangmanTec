// Config file
const keys = require('./keys');

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/hangmanTec';
exports.PORT = process.env.PORT || 8080;