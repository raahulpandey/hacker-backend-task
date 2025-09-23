const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usercontroller = require('../controllers/userscontroller')

const env = "supersecret"

const register = (req, res) => {
    const {username,password} = req.body
    if(!username || ! password) return res.status(400).json({message:'username or password required'})
    const existing = usercontroller.findbyuser(username)
    if(existing) return res.status(400).json('user alredy exist')
    
    const hashed = bcrypt.hashSync(password,8)
    const user = usercontroller.createuser({username,password:hashed })
    res.status(200).json({message:`user registered`,user:user.id,username:user.username})
}

const login = (req,res) => {
    const {username,password} = req.body

    const user = usercontroller.findbyuser(username)
    if(!user) return res.status(400).json({message:'user not exist'})
    
    const valid = bcrypt.compareSync(password,user.password)

    if(!valid) return res.status(400).json({message:'Invalid password'})

    const token= jwt.sign({id:user.id,username:user.username},env,{expiresIn:'1h'})

    res.status(200).json({message:`login sucessfully`,token})
}

module.exports={login,register}