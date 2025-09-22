const express = require('express')
const router = express.Router()

const {getuser,getuserId,createuser,updateuser,deleteuser} = require('../controllers/usercontrollers')

router.get('/',getuser);
router.get('/:id',getuserId);
router.post('/',createuser);
router.put('/:id',updateuser);
router.delete('/:id',deleteuser)

module.exports = router
