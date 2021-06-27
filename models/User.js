const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

    username: { type: String, required: true, Unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profileimage: { type: String, required: false },
    backgroundimage: { type: String, required: false },
    title: { type: String, required: false },
    aboutme: { type: String, required: false },
    gender: { type: String, required: false },
    birthday: { type: String, required: false },
    skills: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        icon: { type: String },
        description: { type: String }
    }],
    email: { type: String, required: false },
    skype: { type: String, required: false },
    youtube: { type: String, required: false },
    linkedin: { type: String, required: false },
    github: { type: String, required: false },
    Phone: { type: String, required: false },
    cvFile: { type: String },
    news: [],
    images: []

})

module.exports = mongoose.model('User', UserSchema)