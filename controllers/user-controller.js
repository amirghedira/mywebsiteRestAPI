const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
exports.addUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                name: req.body.name,
                profileimage: req.body.profileimage,
                backgroundimage: req.body.backgroundimage,
                gender: req.body.gender,
                title: req.body.title,
                aboutme: req.body.aboutme,
                birthday: req.body.birthday,
                interest: req.body.interest,
                email: req.body.email,
                skype: req.body.skype,
                facebook: req.body.facebook,
                github: req.body.github,
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


}

exports.getUser = (req, res, next) => {
    User.findOne()
        .select('-__v -password')
        .exec()
        .then(User => {
            res.status(202).json(User)
        })
        .catch(err => {
            console.log(err)
        })

}

exports.updateUser = (req, res, next) => {
    let ops = {};
    for (let obj of req.body) {
        ops[obj.propName] = obj.value
    }

    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $set: ops })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
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

                                User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $set: { password: hash } })
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
    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $set: { profileimage: req.file.secure_url } })
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
    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $set: { backgroundimage: req.file.secure_url } })
        .exec()
        .then(result => {
            res.status(200).json({ imageurl: req.file.secure_url })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.updloadImages = (req, res, next) => {
    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $push: { images: req.file.secure_url } })
        .exec()
        .then(result => {
            res.status(200).json({ imageurl: req.file.secure_url })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteImage = (req, res, next) => {
    cloudinary.uploader.destroy(req.body.imagelink, (result, err) => {
        if (err)
            console.log(err)
    });
    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { images: req.body.images })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}
exports.updateNews = (req, res, next) => {
    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $set: { news: req.body.news } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postNews = (req, res, next) => {

    const id = new mongoose.Types.ObjectId();
    const date = new Date().toISOString()
    console.log(req.body)
    User.updateOne({ _id: "5e82bb24592a39142b9725f1" }, { $push: { news: { _id: id, title: req.body.title, content: req.body.content, date: date } } })
        .exec()
        .then(result => {
            res.status(200).json({ _id: id, date: date })
        })
        .catch(err => {
            console.log(err)
        })
}