const express = require('express')
const router = express.Router();
const authcontroller = require('../controllers/authcontroller')
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleauthmiddleware')
const { route } = require('./userroutes');

router.post('/register',authcontroller.register);
router.post('/login',authcontroller.login);
router.post('/refresh-token',authcontroller.refreshToken)
router.post('/forgot-password', authcontroller.forgotPassword);
router.post('/reset-password/:token', authcontroller.resetPassword);

router.get('/profile',authMiddleware,(req,res) => {
    res.json({message:'profile accessed' , user:req.user})
})

router.get('/admin',authMiddleware,roleMiddleware(['admin']),(req,res) => {
    res.json({message:'Welcome admin',user:req.user})
})

router.get('/dashboard',authMiddleware,roleMiddleware(['admin','user']),(req,res) => {
    res.json({message:'welcome to the dashboard',user:req.user})
})

module.exports=router