const express = require('express');
const mongoose = require('mongoose');
const Banned = require('../models/Banned');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.get('/', (req, res) => {

    Banned.find()
        .then(result => {
            res.status(200).json({ banned: result });
        })
        .catch(err => {
            res.status(404).json({ error: err })
        })
})

router.post('/', async (req, res) => {
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

})
router.delete('/:id', async (req, res) => {

    try {
        await Banned.deleteOne({ _id: req.params.id })
        res.status(200).json({ result: 'done' })
    }
    catch (err) {
        res.status(404).json({ error: err })
    }


})


module.exports = router