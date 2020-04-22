const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const cloudinary = require('../middlelwares/cloudinary');


exports.getUser = (req, res, next) => {
    User.findOne()
        .select('-__v -password')
        .exec()
        .then(User => {
            res.status(202).json(User)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.updateUser = (req, res, next) => {
    let ops = {};
    for (let obj of req.body) {
        ops[obj.propName] = obj.value
    }

    User.updateOne({ _id: req.user.userid }, { $set: ops })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.updatePassword = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .select('password')
        .exec()
        .then(user => {
            bcrypt.compare(req.body.oldpassword, user.password)
                .then(result => {
                    if (result) {
                        bcrypt.hash(req.body.password, 5)
                            .then(hash => {

                                User.updateOne({ _id: req.user.userid }, { $set: { password: hash } })
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
}

exports.login = (req, res, next) => {

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
                                }, process.env.JWT_SECRET)
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
}
exports.updateProfileImg = (req, res, next) => {
    cloudinary.uploader.destroy(req.body.oldimagelink, (result, err) => {
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: req.user.userid }, { $set: { profileimage: req.file.secure_url } })
        .exec()
        .then(result => {
            res.status(200).json({ imageurl: req.file.secure_url })
        })
        .catch(err => {
            res.status(400).json(err)
            console.log(err)
        })
}

exports.updateBackgroundImg = (req, res, next) => {
    cloudinary.uploader.destroy(req.body.oldimagelink, (result, err) => {
        console.log(result)
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: req.user.userid }, { $set: { backgroundimage: req.file.secure_url } })
        .exec()
        .then(result => {
            res.status(200).json({ imageurl: req.file.secure_url })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.updloadImages = (req, res, next) => {
    User.updateOne({ _id: req.user.userid }, { $push: { images: req.file.secure_url } })
        .exec()
        .then(result => {
            res.status(200).json({ imageurl: req.file.secure_url })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.deleteImage = (req, res, next) => {
    cloudinary.uploader.destroy(req.body.imagelink, (result, err) => {
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: req.user.userid }, { images: req.body.images })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.updateNews = (req, res, next) => {
    User.updateOne({ _id: req.user.userid }, { $set: { news: req.body.news } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.postNews = (req, res, next) => {

    const id = new mongoose.Types.ObjectId();
    const date = new Date().toISOString()
    console.log(req.body)
    User.updateOne({ _id: req.user.userid }, { $push: { news: { _id: id, title: req.body.title, content: req.body.content, date: date } } })
        .exec()
        .then(result => {
            res.status(200).json({ _id: id, date: date })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.addSkill = (req, res) => {
    let id = new mongoose.Types.ObjectId()
    User.updateOne({ _id: req.user.userid }, {
        $push: {
            skills:
                { _id: id, icon: req.file.secure_url, description: req.body.description }
        }
    })
        .exec()
        .then(result => {
            res.status(200).json({ skill: { _id: id, icon: req.file.secure_url, description: req.body.description } })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}
exports.deleteSkill = (req, res) => {

    console.log(req.user.userid)
    User.findOne({ _id: req.user.userid })
        .then(user => {
            const index = user.skills.findIndex(skill => { return skill._id.toString() === req.params.id })
            let imageurl = user.skills[index].icon.split('/')[7].split('.')[0];
            console.log(imageurl)
            user.skills.splice(index, 1)
            user.save()
                .then(result => {
                    cloudinary.uploader.destroy(imageurl, (result, err) => {
                        if (err)
                            console.log(err)
                    });
                    res.status(200).json({ skills: [...user.skills] })

                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: err })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })

}