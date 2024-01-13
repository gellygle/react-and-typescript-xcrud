const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    id:Number,
    username:String,
    password:String,

})

const UserModel=mongoose.model("users",UserSchema)
module.exports=UserModel