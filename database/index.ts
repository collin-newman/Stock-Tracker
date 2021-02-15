const mongoose = require('mongoose');
module.exports.connection = mongoose.connect(`mongodb://${process.env.DB || 'localhost:27017'}/mvp`);