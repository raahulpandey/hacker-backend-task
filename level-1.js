const express = require('express')
const app = express()
const PORT = process.env.port || 5000

app.use((req,res,next) => {
    const now = new Date().toISOString();
    console.log(`[${now} ${req.method} ${req.url}]`)
    next();
})

app.get('/ping',(req,res) => {
    res.status(200).json({message :'pong'})
})

app.get('/time',(req,res) => {
    res.status(200).json({time :new Date().toISOString()})
})

app.get('/random',(req,res) => {
    const val = Math.floor(Math.random()*100) + 1
    res.status(200).json({random : val})
})

app.use((req,res) => {
    res.status(404).json({error :'value not found'})
})

app.listen(PORT,() => {
    console.log('server is running on port 5000')
})