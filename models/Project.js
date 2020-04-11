const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, require: true },
    date: { type: Date, require: true },
    started: { type: String, require: true },
    whatlearned: { type: String, require: true },
    technologie: { type: String, require: true },
    commentsCount: { type: Number, require: true },
    gitViewers: { type: Number, require: true },
    downloadcount: { type: Number, require: true },
    overview: { type: String, require: true },
    status: { type: String, require: true },
    summary: { type: String, require: true },
    platform: { type: String, require: true },
    features: { type: String, require: true },
    github: { type: String, require: true },
    filelink: { type: String, require: true },
    imagesurl: [],
    Comments: [{
        _id: mongoose.Types.ObjectId,
        ip: String,
        autor: String,
        date: Date,
        content: String
    }]

})

module.exports = mongoose.model('Project', ProjectSchema)