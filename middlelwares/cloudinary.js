const cloudinary = require('cloudinary');
const dotenv = require('dotenv')
const config = cloudinary.config;
const uploader = cloudinary.uploader

dotenv.config();
const cloudinaryConfig =
    cloudinary.config({
        cloud_name: "cloud_name",
        api_key: "api_key",
        api_secret: "api_secret"
    });
exports.cloudinaryConfig = cloudinaryConfig;
exports.uploader = uploader;