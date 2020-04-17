const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkAuth = require('../middlelwares/checkAuth')
const banConroller = require('../controllers/banned-contoller')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.get('/', banConroller.getBans)
router.post('/', checkAuth, banConroller.addBan)
router.delete('/:id', checkAuth, banConroller.getBan)


module.exports = router