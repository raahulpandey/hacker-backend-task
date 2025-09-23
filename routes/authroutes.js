const express = require('express')
const router = express.Router();
const authcontroller = require('../controllers/authcontroller')
const authMiddleware = require('../middleware/auth');
const { route } = require('./userroutes');

router.post('/register',authcontroller.register);
router.post('/login',authcontroller.login);

router.get('/profile',authMiddleware,(req,res) => {
    res.json({message:'profile accessed' , user:req.user})
})

module.exports=router