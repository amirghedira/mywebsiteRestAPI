const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyparser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middlelwares/checkAuth')
const objects = require('../middlelwares/Multeruploads')
const dataUri = objects.dataUri
const objects2 = require('../middlelwares/cloudinary')
const uploader = objects2.uploader;
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());
router.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

const storage2 = multer.memoryStorage();
const multerUploads = multer({ storage2 }).single('profileimage');

router.post('/upload', multerUploads, (req, res) => {
    if (req.file) {
        const file = dataUri(req.file).content;
        uploader.upload(file).then((result) => {
            const image = result.url;
            res.status(200).json(image)
        }).catch((err) => res.status(400).json({
            messge: 'someting went wrong while processing your request',
            data: {
                err
            }
        }))
    }
});

router.post('/', checkAuth, (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                name: req.body.name,
                profileimage: req.body.profileimage,
                backgroundimage: req.body.backgroundimage,
                title: req.body.title,
                aboutme: req.body.aboutme,
                birthday: req.body.birthday,
                interest: req.body.interest,
                email: req.body.email,
                skype: req.body.skype,
                facebook: req.body.facebook,
                linkedin: req.body.linkedin,
                Phone: req.body.Phone,
                images: req.body.imagesurl

            })
            user.save()
                .then(result => {
                    res.status(202).json("done")
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => { console.log(err) })


});

router.get('/', (req, res, next) => {
    User.findOne()
        .select('-__v -_id')
        .exec()
        .then(result => {
            res.status(202).json(result)
        })
        .catch(err => {
            console.log(err)
        })

})
// router.delete('/:id', (req, res, next) => {
//     User.remove({
//         _id: req.params.id
//     })
//         .exec()
//         .then(result => {
//             res.status(200).json(result)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })
router.patch('/', checkAuth, (req, res, next) => {
    let ops = {};
    for (let obj of req.body) {
        ops[obj.propName] = obj.value
    }

    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $set: ops })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/updatepassword', checkAuth, (req, res, next) => {
    User.findOne({ username: req.body.username })
        .select('password')
        .exec()
        .then(user => {
            bcrypt.compare(req.body.oldpassword, user.password)
                .then(result => {
                    if (result) {
                        bcrypt.hash(req.body.password, 5)
                            .then(hash => {

                                User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $set: { password: hash } })
                                    .exec()
                                    .then(response => {
                                        res.status(200).json({ message: 'Password successfully updated' })
                                    })
                                    .catch(err => {
                                        res.status(500).json({ qqq: err })
                                    })
                            })
                            .catch(err => {
                                res.status(400).json({ error: err })
                            })
                    } else
                        res.status(409).json({ message: 'Actual password is wrong' })
                })
                .catch(err => {
                    res.status(500).json({ error: err })
                })
        })
        .catch(err => {
            res.status(500).json({ error: "on users found" })
        })
})
router.post('/login', (req, res, next) => {

    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user) {
                const password = user.password
                bcrypt.compare(req.body.password, password)
                    .then(passresult => {
                        if (passresult) {

                            const token = jwt.sign(
                                {
                                    username: user.username,
                                    userid: user._id
                                }, "secretcode", {
                                expiresIn: "1h"
                            })
                            console.log(token)
                            res.status(200).json({ message: 'You are successfully logged in', token: token })
                        }

                        else
                            res.status(201).json({ message: 'Wrong password, Try again!' })
                    })
                    .catch(err => {
                        res.status(404).json({
                            error: err
                        })
                    })
            } else {

                res.status(202).json({
                    message: 'Aucun utilisateur avec se nom'
                })
            }

        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
})
router.patch('/updateprofileimg', checkAuth, (req, res, next) => {
    uploader.destroy(req.body.oldimagelink, (result, err) => {
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $set: { profileimage: req.body.newimagelink } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
            console.log(err)
        })
})
router.patch('/updatebgimage', checkAuth, (req, res, next) => {
    uploader.destroy(req.body.oldimagelink, (result, err) => {
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $set: { backgroundimage: req.body.newimagelink } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/deleteimage', checkAuth, (req, res) => {
    uploader.destroy(req.body.imagelink, (result, err) => {
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { images: req.body.images })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/uploadimage', checkAuth, (req, res, next) => {
    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $push: { images: req.body.newimagelink } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/postnews', checkAuth, (req, res, next) => {
    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $push: { news: req.body.news } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
router.patch('/changenews', checkAuth, (req, res, next) => {
    User.updateOne({ _id: "5e7d0ff83edb850abce0e4bc" }, { $set: { news: req.body.news } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router;