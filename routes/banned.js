const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const banConroller = require('../controllers/banned-contoller')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.get('/', banConroller.getBans)
router.post('/', banConroller.addBan)
router.delete('/:id', banConroller.getBan)


module.exports = router