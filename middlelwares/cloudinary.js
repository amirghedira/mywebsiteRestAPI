const cloudinary = require('cloudinary');
const uploader = cloudinary.uploader

const cloudinaryConfig =
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
exports.cloudinaryConfig = cloudinaryConfig;
exports.uploader = uploader;