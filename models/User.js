const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

    username: { type: String, require: true, Unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    profileimage: { type: String, require: false },
    backgroundimage: { type: String, require: false },
    title: { type: String, require: false },
    aboutme: { type: String, require: false },
    gender: { type: String, require: false },
    birthday: { type: String, require: false },
    interest: { type: String, require: false },
    email: { type: String, require: false },
    skype: { type: String, require: false },
    facebook: { type: String, require: false },
    linkedin: { type: String, require: false },
    github: { type: String, require: false },
    Phone: { type: String, require: false },
    news: [],
    images: []

})

module.exports = mongoose.model('User', UserSchema)