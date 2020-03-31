const cloudinary = require('cloudinary');
const dotenv = require('dotenv')
const config = cloudinary.config;
const uploader = cloudinary.uploader

dotenv.config();
const cloudinaryConfig =
    cloudinary.config({
        cloud_name: "cloud_name",
        api_key: "cloud_key",
        api_secret: "cloud_secret"
    });
exports.cloudinaryConfig = cloudinaryConfig;
exports.uploader = uploader;