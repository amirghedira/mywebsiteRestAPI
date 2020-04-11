const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BannedSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ip: { type: String, require: true },
    name: { type: String, require: true },
    content: { type: String, require: true },
    date: { type: Date, require: true }
})

module.exports = mongoose.model('Banned', BannedSchema)