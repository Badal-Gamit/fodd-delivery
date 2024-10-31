const mongoose=require('mongoose')
const FoodSchema= new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 discription:{
    type:String,
    required:true
 },
 image:{
      data:Buffer,
      contentType:String
    },
 category:{
    type:String,
    enum:['salad','rolls','desserts','sandwich','cake','pure veg','non veg','pasta','noddle' ]
 },
 quantity:{
   type:Number,
  default:0
}
,
 price:{
    type:Number,
    required:true
 }

},{timestamps:true})
module.exports=mongoose.model('menu',FoodSchema)