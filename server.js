const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
require("dotenv").config();

//middlewares
app.use(express.json({limit: '10mb'}))
app.use(cors())

//import router
const userRoute = require('./routes/Users');
const adminRoute = require ('./routes/Admin');
const productRoute = require ('./routes/product');
const orderRoute = require('./routes/Order')


//User route
app.use('/users', userRoute)

//Admin route 
app.use('/admin', adminRoute)

//Product route

app.use('/products',productRoute)
app.use('/orders', orderRoute)

// server runningURI
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
app.listen(process.env.PORT,()=>console.log("server is running on port 5000"))
}) 