const Project = require('../models/Project');
const cloudinary = require('../middlelwares/cloudinary');
const mongoose = require('mongoose')
exports.getProjects = (req, res, next) => {
    Project.find()
        .exec()
        .then(result => {
            res.status(200).json({
                result
            })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
}

exports.getProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id }, {})

        .exec()
        .then(result => {
            console.log(result)
            if (result)
                res.status(200).json({ result })
            else
                res.status(404).json({ message: 'Project not found' })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
}
exports.addProject = (req, res, next) => {
    const urls = req.files.map(file => { return file.secure_url })
    const id = new mongoose.Types.ObjectId();
    const date = new Date().toISOString();
    const product = new Project({
        _id: id,
        name: req.body.name,
        started: req.body.started,
        date: date,
        overview: req.body.overview,
        whatlearned: req.body.whatlearned,
        technologie: req.body.technologie,
        commentsCount: 0,
        gitViewers: 0,
        downloadcount: 0,
        status: req.body.status,
        summary: req.body.summary,
        platform: req.body.platform,
        features: req.body.features,
        github: req.body.github,
        filelink: req.body.filelink,
        imagesurl: urls,
        comments: []
    })
    product.save()
        .then(result => {
            res.status(200).json({ _id: id, date: date, imagesurl: urls })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ error: err })
        })
}

exports.updateProject = (req, res, next) => {
    let ops = {};
    ops[req.body.propName] = req.body.value
    Project.updateOne({ _id: req.params.id }, { $set: ops })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteProject = (req, res, next) => {

    req.body.files.forEach(element => {
        cloudinary.uploader.destroy(element.split('/')[7].split('.')[0], (err) => {
        });
    });
    Project.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })

}

exports.postComment = (req, res, next) => {

    const date = new Date().toISOString()
    const newComment = { _id: new mongoose.Types.ObjectId(), ip: req.body.comment.ip, autor: req.body.comment.autor, content: req.body.comment.content, date: date }
    Project.updateMany({ _id: req.params.id }, { $push: { Comments: newComment }, $set: { commentsCount: req.body.commentsCount } })
        .exec()
        .then(result => {
            res.status(200).json({ _id: newComment._id, date: date })
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

exports.updateDownloads = (req, res, next) => {
    Project.updateOne({ _id: req.params.id }, { $set: { downloadcount: req.body.downloadcount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

exports.updateGitViewers = (req, res, next) => {
    Project.updateOne({ _id: req.params.id }, { $set: { gitViewers: req.body.gitviewers } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

exports.deleteComment = (req, res, next) => {
    Project.updateMany({ _id: req.params.id }, { $set: { Comments: req.body.Comments, commentsCount: req.body.commentsCount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

exports.addProjectImage = (req, res, next) => {

    const urls = req.files.map(file => { return file.secure_url })
    Project.updateOne({ _id: req.params.id }, { $push: { imagesurl: urls } })
        .exec()
        .then(result => {
            res.status(200).json({ imageurl: req.file.secure_url })
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

exports.deleteProjectImage = (req, res, next) => {

    cloudinary.uploader.destroy(req.body.imagetodelete.split('/')[7].split('.')[0], (err) => {
    });
    Project.updateOne({ _id: req.params.id }, { $set: { imagesurl: req.body.newimages } })
        .exec()
        .then(result => {
            res.status(200).json({ result: 'done' })
        })
        .catch(err => {
            res.status(404).json(err)
        })
}