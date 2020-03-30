const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path')
const Project = require('../models/Project')
const objects = require('../middlelwares/Multeruploads')
const dataUri = objects.dataUri
const objects2 = require('../middlelwares/cloudinary')
const checkAuth = require('../middlelwares/checkAuth')
const uploader = objects2.uploader;


const storage2 = multer.memoryStorage();
const multerUploads = multer({ storage2 }).single('image');
const storage3 = multer.memoryStorage();
const multerUploads2 = multer({ storage3 }).array('images');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

router.post('/uploads', multerUploads2, async (req, res) => {
    if (req.files) {
        const urls = []
        const files = req.files;
        for (const file of files) {
            const newfile = dataUri(file).content;
            await uploader.upload(newfile)
                .then((result) => {
                    urls.push(result.url)
                })
                .catch((err) => res.status(400).json({
                    messge: 'someting went wrong while processing your request',
                    data: {
                        err
                    }
                }))
        }
        res.status(200).json({
            data: {
                urls
            }
        })
    } else {
        res.status(400).json({
            error: 'no files entered'
        })
    }
});
router.post('/upload', multerUploads, (req, res) => {
    if (req.file) {
        const file = dataUri(req.file).content;
        uploader.upload(file).then((result) => {
            const image = result.url;
            res.status(200).json({
                messge: 'Your image has been uploded successfully to cloudinary',
                data: {
                    image
                }
            })
        }).catch((err) => res.status(400).json({
            messge: 'someting went wrong while processing your request',
            data: {
                err
            }
        }))
    }
});
router.get('/', (req, res, next) => {
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
})
router.get('/:id', (req, res, next) => {
    Project.find({ id: req.params.id }, {})

        .exec()
        .then(result => {
            if (result.length > 0)
                res.status(200).json({ result })
            else
                res.status(404).json({ result })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})
router.post('/', checkAuth, (req, res, next) => {
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
        filename: req.body.filename,
        imagesurl: [...req.body.imagesurl],
        comments: []
    })
    product.save()
        .then(result => {
            res.status(200).json('done')
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})
router.patch('/postcomment', (req, res, next) => {
    Project.updateMany({ id: req.body.id }, { $push: { Comments: req.body.comment }, $set: { commentsCount: req.body.commentsCount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/downloadcount/:id', (req, res, next) => {
    Project.updateOne({ id: req.params.id }, { $set: { downloadcount: req.body.downloadcount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/gitviewers/:id', (req, res, next) => {
    Project.updateOne({ id: req.params.id }, { $set: { gitViewers: req.body.gitviewers } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/commentdel/:id', checkAuth, (req, res, next) => {
    Project.updateMany({ id: req.params.id }, { $set: { Comments: req.body.Comments, commentsCount: req.body.commentsCount } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/deleteproject/:id/', checkAuth, (req, res, next) => {

    req.body.files.forEach(element => {
        uploader.destroy(element.split('/')[7].split('.')[0], (err) => {
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

})
router.patch('/:id', checkAuth, (req, res, next) => {
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
})
module.exports = router;