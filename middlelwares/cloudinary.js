const cloudinary = require('cloudinary');
const dotenv = require('dotenv')
const config = cloudinary.config;
const uploader = cloudinary.uploader

dotenv.config();
const cloudinaryConfig =
    cloudinary.config({
        cloud_name: "hojbdhnz4",
        api_key: "715639388368954",
        api_secret: "ozpx4Mamw0hXO28kikNfYnqOXMs"
    });
exports.cloudinaryConfig = cloudinaryConfig;
exports.uploader = uploader;