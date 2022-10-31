const express = require('express')

const app = express()

const dotenv = require("dotenv").config();

const route = require('./src/Route/route')

const mongoose = require('mongoose')


mongoose.connect(dotenv.parsed.DB, {
    useNewUrlParser: true
})
.then(()=> console.log(`MongoDB is connected `))
.catch( err => console.log(err))

app.use(express.json())
app.use('/', route)

app.listen( dotenv.parsed.PORT || 3000 , (err)=>{
    if(err) console.log(err)
    else console.log(`Server Running on port ${dotenv.parsed.PORT}.....! 🚀`)
});