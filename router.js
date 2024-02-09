const express=require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const resumemodel = require("./model")

hashPasswordGenerator=async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

router.post("/signup",async (req,res)=>
{
let {data} = {"data": req.body}
let password=data.password
const hashedPassword = await hashPasswordGenerator(password)
data.password=hashedPassword
let form = new resumemodel(data)
let result = await form.save()
res.json(
    {
        status:"success"
    }
)
    })


module.exports=router