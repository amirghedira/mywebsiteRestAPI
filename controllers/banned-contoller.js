
const mongoose = require('mongoose');
const Banned = require('../models/Banned');


exports.getBans = (req, res) => {

    Banned.find()
        .then(result => {
            res.status(200).json({ banned: result });
        })
        .catch(err => {
            res.status(404).json({ error: err })
        })
}

exports.getBan = async (req, res) => {

    try {
        await Banned.deleteOne({ _id: req.params.id })
        res.status(200).json({ result: 'done' })
    }
    catch (err) {
        res.status(404).json({ error: err })
    }


}


exports.addBan = async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const date = new Date().toISOString();
    const banned = new Banned({
        _id: id,
        ip: req.body.ip,
        name: req.body.name,
        content: req.body.content,
        date: date
    })
    try {
        await banned.save()
        res.status(200).json({ _id: id, date: date })
    }
    catch (err) {
        res.status(404).json({ error: err })
    }

}
