import express from "express"

const app = express();
const port = process.env.port || 3000;

app.get("/",async(req,res)=>{
    res.json({
        message:"Hello Tester"
    })
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})










