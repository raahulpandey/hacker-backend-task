const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express()
app.use(express.json())

const users=[];

//register
app.post('/register',async (req,res) => {
    const {username,password} = req.body
    const hashpassword = await bcrypt.hash(password,10)

    users.push({username:username , password:hashpassword})
    res.json({message:'user register sucessfullly'})
})

//login
app.post('/login',async (req,res) => {
    const {username,password}= req.body
    const user = users.find(u => u.username === username)
    if(!user) {
        return res.status(400).json({message:'user not found'})
    }
    const ishashpassword = await bcrypt.compare(password,user.password)
    if(!ishashpassword) return res.status(400).json({message:'Invalid password'})

        const token = jwt.sign({username},"secretkey",{expiresIn : "1min"})
        res.json({message:'Login sucessffully',token})
})

//protected route
app.get('/profile',async (req,res) => {
    const authuser = req.headers['authorization']
    if(!authuser) return res.status(401).json({error:'no token provided'})

    const token = authuser.split(" ")[1]
    jwt.verify(token,"secretkey",(err,decode) => {
        if(err) return res.status(403).json({message:'Invalid token'})
        res.json({message:`welcome ${decode.username}, this is your profile`})
    })
})
app.listen(5000,() => {
    console.log('server is running in the port 5000')
})

