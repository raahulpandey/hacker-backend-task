const express =require('express')
const router = express.Router()

const {echo} =require('../controllers/echocontroller')

router.post('/',echo)

module.exports=router