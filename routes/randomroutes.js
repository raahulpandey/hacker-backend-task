const express = require('express')
const router = express.Router()

const {random } = require('../controllers/randomcontrollers')

router.get('/',random)

module.exports = router