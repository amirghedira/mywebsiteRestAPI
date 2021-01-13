const Topic = require('../models/Topic');
const mongoose = require('mongoose');

exports.getTopics = (req, res) => {

    Topic.find()
        .select(' -__v')
        .exec()
        .then(contents => {

            res.status(200).json({ result: contents })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getQuestions = (req, res) => {

    Topic.find({ type: 'questions' })
        .select(' -__v')
        .exec()
        .then(contents => {

            res.status(200).json({ result: contents })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getSuggestions = (req, res) => {

    Topic.find({ type: 'suggestions' })
        .select(' -__v')
        .exec()
        .then(contents => {

            res.status(200).json({ result: contents })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getTopic = (req, res) => {

    Topic.findById(req.params.id)
        .exec()
        .then(result => {
            if (result)
                res.status(200).json({ result: result })
            else
                res.status(404).json({ message: 'Topic not found' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.postTopic = async (req, res) => {
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

exports.postComment = async (req, res) => {
    try {
        let id = new mongoose.Types.ObjectId()
        let date = new Date().toISOString();
        await Topic.updateOne({ _id: req.params.id }, { $push: { replies: { _id: id, ip: req.body.ip, autor: req.body.autor, content: req.body.content, date: date } } }).exec()
        res.status(200).json({ date: date, id: id })

    } catch (err) {
        res.status(500).json({ error: err })

    }

}

exports.deleteComment =
    (req, res) => {

        Topic.updateOne({ _id: req.params.id }, { $set: { replies: req.body.newreplies } })
            .exec()
            .then(result => {
                res.status(200).json({ result: 'done' })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

exports.editTopicState = (req, res) => {

    Topic.updateOne({ _id: req.params.id }, { $set: { state: req.body.state } })
        .exec()
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.pinUnpinTopic = (req, res) => {

    Topic.updateOne({ _id: req.params.id }, { $set: { pin: req.body.state } })
        .exec()
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.deleteTopic = (req, res) => {
    Topic.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getnumberTopics = async (req, res) => {
    let topicCounts = { suggestions: null, questions: null }
    try {
        topicCounts.suggestions = await Topic.countDocuments({ type: 'suggestions' })
    } catch (error) {
        throw error;
    }
    try {

        topicCounts.questions = await Topic.countDocuments({ type: 'questions' })

    } catch (error) {
        throw error;

    }
    res.status(200).json({ result: topicCounts })
}

exports.deleteallTopics = (req, res) => {

    Topic.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({ result: 'deleted' })

        })
        .catch(err => {
            res.status(400).json({ err: err })
        })
}