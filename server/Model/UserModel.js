const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true },
    email:{
   type:String,
   required:true,
   unique:true
    },
  address:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},{timestamps:true})
module.exports=mongoose.model('user',userSchema)