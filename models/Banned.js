const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BannedSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ip: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true }
})

module.exports = mongoose.model('Banned', BannedSchema)