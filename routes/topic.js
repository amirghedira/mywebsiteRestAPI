const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkAuth = require('../middlelwares/checkAuth')
const topicController = require('../controllers/topic-controller')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', topicController.getTopics)

router.get('/questions', topicController.getQuestions)

router.get('/suggestions', topicController.getSuggestions)

router.get('/counttopic', topicController.getnumberTopics)

router.get('/:id', topicController.getTopic)

router.post('/', topicController.postTopic)

router.patch('/postcomment/:id', topicController.postComment)

router.patch('/deletecomment/:id', checkAuth, topicController.deleteComment)

router.patch('/topicstate/:id', checkAuth, topicController.editTopicState)

router.patch('/topicpin/:id', checkAuth, topicController.pinUnpinTopic)

router.delete('/:id', checkAuth, topicController.deleteTopic)

router.delete('/', topicController.deleteallTopics);



module.exports = router;