const mongoose = require('mongoose');

mongoose.connect(process.env.PG_URL || 'mongodb://127.0.0.1:27017/art_nook_db');

module.exports = mongoose.connection;