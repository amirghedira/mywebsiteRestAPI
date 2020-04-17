const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    content: { type: String, required: true },
    read: { type: Boolean, required: true },
    link: { type: String, required: true },
    date: { type: String, required: true }
})


module.exports = mongoose.model('Notification', NotificationSchema)