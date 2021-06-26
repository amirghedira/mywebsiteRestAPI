const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    date: { type: Date, required: true },
    started: { type: String, required: true },
    whatlearned: { type: String, required: true },
    technologie: { type: String, required: true },
    commentsCount: { type: Number, required: true },
    gitViewers: { type: Number, required: true },
    downloadcount: { type: Number, required: true },
    overview: { type: String, required: true },
    status: { type: String, required: true },
    summary: { type: String, required: true },
    platform: { type: String, required: true },
    features: { type: String, required: true },
    github: { type: String },
    filelink: { type: String },
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