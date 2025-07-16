const express = require('express')

const app = express();


app.get('/',(req,res)=>{
    res.send({"status": "201","message" : "welcome to app"})
})

app.listen(3000)