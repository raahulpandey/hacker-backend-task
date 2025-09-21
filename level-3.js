const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use((req,res,next) => {
    const now = new Date().toISOString();
    console.log(`[${now} ${req.method} ${req.url}]`)
    next();
})
app.use(express.json())

app.get('/random',(req,res) => {
    const min = Number(req.query.min) || 1;
    const max = Number(req.query.max) || 100;
    if(isNaN(min) || isNaN(max)) {
        return res.status(400).json({error:'Min and Max must be a number'})
    }
    if(max <= min) {
        return res.status(400).json({error:'max must be greater than the min'})
    }
    const randomNumber = Math.floor(Math.random()*(max-min+1)) +min;
    res.status(200).json({random : randomNumber,min,max})
})
app.use((req,res) => {
    res.status(404).json({error :'value not found'})
})

app.listen(PORT,() => {
    console.log('server is running on port 5000')
})