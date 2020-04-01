const cloudinary = require('cloudinary');
const dotenv = require('dotenv')
const config = cloudinary.config;
const uploader = cloudinary.uploader

dotenv.config();
const cloudinaryConfig =
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
exports.cloudinaryConfig = cloudinaryConfig;
exports.uploader = uploader;