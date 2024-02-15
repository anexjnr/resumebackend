const resumerouter=require("./router")
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const app = express()

//middleware

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://anex:anex123@cluster0.bgkikbl.mongodb.net/resumeDb?retryWrites=true&w=majority",
{
    useNewUrlParser:true
})

//routing

app.use("/api/resume",resumerouter)

app.listen(3001,()=>{
    console.log("server running")
})