const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const connectDB = require('./dataBase/data')
const errorHandller = require('./middleware/errorHandller');
const errorHandler = require('./middleware/errorHandler');
const app = express()


const PORT = process.env.PORT || 5000

connectDB();

const authroute = require('./routes/authroutes')

app.use(express.json())

app.use('/auth',authroute)  

app.use((req,res) => {
    res.status(404).json({message:'rouet not found'})
})

app.use(errorHandller);
app.use(errorHandler);

app.listen(PORT,() => {
    console.log('server is running on port 5000')

})

