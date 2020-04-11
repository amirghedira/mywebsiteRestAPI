const Topic = require('../models/Topic');
const mongoose = require('mongoose');


exports.getTopics = (req, res, next) => {

    Topic.find()
        .select(' -__v')
        .then(contents => {

            res.status(200).json({ result: contents })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getQuestions = (req, res, next) => {

    Topic.find({ type: 'questions' })
        .select(' -__v')
        .then(contents => {

            res.status(200).json({ result: contents })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getSuggestions = (req, res, next) => {

    Topic.find({ type: 'suggestions' })
        .select(' -__v')
        .then(contents => {

            res.status(200).json({ result: contents })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getTopic = (req, res, next) => {

    Topic.findOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: result })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.postTopic = async (req, res, next) => {
    const topic = new Topic({
        ip: req.body.ip,
        title: req.body.title,
        autor: req.body.autor,
        content: req.body.content,
        date: new Date().toISOString(),
        type: req.body.type,
        state: true,
        pin: false,
        replies: []
    })
    let createdtopic = null
    try {
        createdtopic = await topic.save()
        res.status(200).json({ id: createdtopic._id })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.postComment = async (req, res, next) => {
    try {
        let id = new mongoose.Types.ObjectId()
        let date = new Date().toISOString();
        await Topic.updateOne({ _id: req.params.id }, { $push: { replies: { _id: id, ip: req.body.ip, autor: req.body.autor, content: req.body.content, date: date } } })
        res.status(200).json({ date: date, id: id })
    } catch (err) {
        res.status(500).json({ error: err })

    }

}

exports.deleteComment =
    (req, res, next) => {

        Topic.updateOne({ _id: req.params.id }, { $set: { replies: req.body.newreplies } })
            .then(result => {
                res.status(200).json({ result: 'done' })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

exports.editTopicState = (req, res, next) => {

    Topic.updateOne({ _id: req.params.id }, { $set: { state: req.body.state } })
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.pinUnpinTopic = (req, res, next) => {

    Topic.updateOne({ _id: req.params.id }, { $set: { pin: req.body.state } })
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.deleteTopic = (req, res, next) => {
    Topic.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}