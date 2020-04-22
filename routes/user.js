const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const checkAuth = require('../middlelwares/checkAuth');
const cloudinary = require('../middlelwares/cloudinary');
const UserController = require('../controllers/user-controller');

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

router.get('/', UserController.getUser);
router.patch('/', checkAuth, UserController.updateUser);
router.patch('/updatepassword', checkAuth, UserController.updatePassword);
router.post('/login', UserController.login);
router.patch('/updateprofileimg', checkAuth, cloudinary.parser.single('profileimage'), UserController.updateProfileImg);
router.patch('/updatebgimage', checkAuth, cloudinary.parser.single('bgimage'), UserController.updateBackgroundImg);
router.patch('/deleteimage', checkAuth, UserController.deleteImage);
router.patch('/uploadimage', checkAuth, cloudinary.parser.single('imagesofprofile'), UserController.updloadImages);
router.patch('/addskill', cloudinary.parser.single('skillicon'), checkAuth, UserController.addSkill);
router.delete('/deleteskill/:id', checkAuth, UserController.deleteSkill)
router.patch('/postnews', checkAuth, UserController.postNews);
router.patch('/changenews', checkAuth, UserController.updateNews);

module.exports = router;