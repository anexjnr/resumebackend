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

    router.post("/signin",async(req,res)=>{
        let email = req.body.email
    let data = await resumemodel.findOne({email:email})
    if(!data)
    {
        return res.json(
            {
                status:"Invalid user"
            }
        )
    }
    let dpPassword = data.password
    let inputPassword = req.body.password
    const match = await bcrypt.compare(inputPassword,dpPassword)
    if(!match)
    {
        res.json(
            {
                status:"Invalid Password"
            }
        )
    }
    res.json(
        {
            status:"success"
        }
    )
    })

module.exports=router