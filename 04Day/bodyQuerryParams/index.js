const express = require("express")

const app = express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("<h1>home page</h1>")
})


app.post("/calculationbybody",(req,res)=>{
    let {num1,num2}= req.body;
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    res.send("addition is : " + (num1 + num2))
})
app.post("/calculationbyquerry",(req,res)=>{
    let {num1,num2}= req.query;
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    res.send("addition is : " + (num1 + num2))
})

app.get("/params/:id",(req,res)=>{
    const ID = req.params.id
    res.send("params ID is : " + ID)
})

app.listen("3000",()=>{
    console.log("app is running on http://localhost:3000")
})