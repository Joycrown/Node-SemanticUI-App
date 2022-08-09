const express = require('express')
const homeRoute = require('./routes/home')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')



const port = 3000
mongoose.connect('mongodb://localhost:27017/nodejs_crud',{useNewUrlParser:true})
const db = mongoose.connection;
db.on('error', () => {
  console.log("something went wrong in connection to database")
})
db.once('open',()=>{
  console.log("DB connection has been established")
})


// MIDDLEWARE
app.set('view engine','ejs')
app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended:false}))

app.use(bodyParser.json())

// ROUTING
app.use('/',homeRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})