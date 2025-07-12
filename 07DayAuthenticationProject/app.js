const express = require('express');
const { connectDB } = require('./configs/DBConnection');
require('dotenv').config();

connectDB()
const app = express();
app.use(express.json())


app.use('/api/auth', require('./routes/authRoutes'))


app.listen(process.env.PORT || 8020,()=>{
    console.log(`server is listning on http://localhost:${process.env.PORT}`)
})