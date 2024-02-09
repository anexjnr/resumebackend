const mongoose = require("mongoose")
const resumeschema = new mongoose.Schema(
    {
        name:String,
        email:String,
        gender:String,
        password:String
    }
)

module.exports = mongoose.model("resume",resumeschema)