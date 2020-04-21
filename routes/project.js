const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const cloudinary = require('../middlelwares/cloudinary')
const checkAuth = require('../middlelwares/checkAuth')
const ProjectController = require('../controllers/project-controller');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get('/', ProjectController.getProjects)
router.get('/:id', ProjectController.getProject)
router.post('/', checkAuth, cloudinary.parser.array('projectimages', 20), ProjectController.addProject)
router.patch('/addprojectimages/:id', checkAuth, cloudinary.parser.array('projectimages', 20), ProjectController.addProjectImage)
router.patch('/deleteprojectimage/:id', checkAuth, ProjectController.deleteProjectImage)
router.patch('/deleteproject/:id/', checkAuth, ProjectController.deleteProject)
router.patch('/:id', checkAuth, ProjectController.updateProject)
router.post('/postcomments/:id', ProjectController.postComment)
router.patch('/updatedownloads/:id', ProjectController.updateDownloads)
router.patch('/updategitviewers/:id', ProjectController.updateGitViewers)
router.patch('/deletecomment/:id', checkAuth, ProjectController.deleteComment)

module.exports = router;