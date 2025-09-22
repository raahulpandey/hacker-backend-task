const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const logger = require('./middleware/logger');
const echoroute = require('./routes/echoroutes')
const randomroute = require('./routes/randomroutes')

app.use(logger)

app.use('/echo',echoroute);
app.use('/random',randomroute)

app.use((req,res) => {
    res.status(404).json({error :'value not found'})
})

app.listen(PORT,() => {
    console.log('server is running on port 5000')
})