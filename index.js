const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// Database Connection
const {DBConnection} = require('./Database/db-connection')
DBConnection()


//Middleware
app.use(express.json())
app.use(cookieParser('secretKey'))


// Data Router form dataRouter.js
const dataRoute = require('./Routers/dataRouter')
app.use('/', dataRoute)

const userRoute = require('./Routers/userRouter')
app.use('/', userRoute)



// 404 Not Found Page
app.get('*', (req, res) => {
   res.status(404).send('404 Page Not Found')
})




app.listen('3000', console.log('Listening to port 3000'))