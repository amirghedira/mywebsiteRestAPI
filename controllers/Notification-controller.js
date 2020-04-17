const mongoose = require('mongoose');
const Notification = require('../models/Notification');


exports.addNotification = async (req, res) => {

    const notification = new Notification({
        _id: req.body.id,
        content: req.body.content,
        date: new Date().toISOString(),
        link: req.body.link,
        read: false
    })
    try {
        let result = await notification.save()
        res.status(200).json({ notification: result })
    } catch (error) {
        res.status(400).json({ err: error })

    }
}
exports.getNotifications = (req, res) => {
    Notification.find()
        .exec()
        .then(result => {
            res.status(200).json({ result: result })
        })
        .catch(err => {
            res.status(400).json({ err: error })
        })

}

exports.deleteNotification = (req, res) => {

    Notification.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({ result: "deleted" })
        })
        .catch(err => {
            res.status(400).json({ err: error })
        })
}
exports.deletenotifications = (req, res) => {
    Notification.deleteMany({ link: req.body.link })
        .exec()
        .then(result => {
            res.status(200).json({ result: "deleted" })
        })
        .catch(err => {
            res.status(400).json({ err: error })
        })
}
exports.clearNotifications = (req, res) => {

    Notification.deleteMany().exec()
        .then(result => {
            res.status(200).json({ result: "Notifications Cleared" })

        })
        .catch(err => {
            res.status(400).json({ err: error })

        })
}

exports.markReadNotification = (req, res) => {

    Notification.updateOne({ _id: req.params.id }, { $set: { read: true } })
        .exec()
        .then(result => {
            res.status(200).json({ result: 'updated' })
        })
        .catch(err => {
            res.status(400).json({ err: error })
        })
}