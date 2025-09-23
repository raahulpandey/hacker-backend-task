const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const authroute = require('./routes/authroutes')

app.use(express.json())

app.use('/auth',authroute)

app.listen(PORT,() => {
    console.log('server is running on port 5000')
})