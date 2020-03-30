const Datauri = require('datauri');
const path = require('path');
const dUri = new Datauri();
const dataUri = file => dUri.format(path.extname(file.originalname), file.buffer);
exports.dataUri = dataUri;