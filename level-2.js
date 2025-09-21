const express = require('express')
const app = express()
const PORT = process.env.port || 5000

app.use((req,res,next) => {
    const now = new Date().toISOString();
    console.log(`[${now} ${req.method} ${req.url}]`)
    next();
})
app.use(express.json())

app.post('/echo',(req,res) => {
    const data = req.body
    res.status(200).json({you_sent:data})
})
app.use((req,res) => {
    res.status(404).json({error :'value not found'})
})

app.listen(PORT,() => {
    console.log('server is running on port 5000')
})