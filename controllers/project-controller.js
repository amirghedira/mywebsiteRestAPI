const Project = require('../models/Project');

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
    Project.findOne({ id: req.params.id }, {})

        .exec()
        .then(result => {
            console.log(result)
            if (result.length > 0)
                res.status(200).json({ result })
            else
                res.status(404).json({ result })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
}
exports.addProject = (req, res, next) => {
    const urls = req.files.map(file => { return file.secure_url })
    const product = new Project({
        id: req.body.id,
        name: req.body.name,
        started: req.body.started,
        date: req.body.date,
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
            res.status(200).json({ imagesurl: urls })
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
}

exports.updateProject = (req, res, next) => {
    let ops = {};
    ops[req.body.propName] = req.body.value
    Project.updateOne({ id: req.params.id }, { $set: ops })
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
    Project.deleteOne({ id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })

}

exports.postComment = (req, res, next) => {
    Project.updateMany({ id: req.body.id }, { $push: { Comments: req.body.comment }, $set: { commentsCount: req.body.commentsCount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.updateDownloads = (req, res, next) => {
    Project.updateOne({ id: req.params.id }, { $set: { downloadcount: req.body.downloadcount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.updateGitViewers = (req, res, next) => {
    Project.updateOne({ id: req.params.id }, { $set: { gitViewers: req.body.gitviewers } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteComment = (req, res, next) => {
    Project.updateMany({ id: req.params.id }, { $set: { Comments: req.body.Comments, commentsCount: req.body.commentsCount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}