const cloudinary = require('cloudinary');
const dotenv = require('dotenv')
const config = cloudinary.config;
const uploader = cloudinary.uploader

dotenv.config();
const cloudinaryConfig =
    cloudinary.config({
        cloud_name: "hoz1jpmp7",
        api_key: "287757447646335",
        api_secret: "1jgYtcyaC2soXm0yNOw7gw3lFKU"
    });
exports.cloudinaryConfig = cloudinaryConfig;
exports.uploader = uploader;