const express = require('express')
const { connection } = require('./Config/db')
const { BikeRouter } = require('./Routes/bike.route')
const { UserRouter } = require('./Routes/user.route')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const { authentication } = require('./Middleware/authentication');
require('dotenv').config()
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());




app.get('/',(req,res)=>
{
    res.send('Hello this is the homepage of Pococare assignment')
})



app.use('/user', UserRouter )
app.use('/bike', authentication,BikeRouter)
// app.use('/bike',BikeRouter)





app.listen(process.env.PORT,async(req,res)=>
{
    try {
        await connection
        console.log('listening on port', process.env.PORT)
        console.log('Db is connected to server')
        
    } catch (error) {
        console.log('Db is not connectd', error.message)
    }
})