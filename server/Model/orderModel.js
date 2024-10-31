const mongoose=require('mongoose')
const OrderSchema= new mongoose.Schema({
 buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
 },
 product:[ {type:Object }],
 payment:{},
status:{
    type:String,
    enum:['food processing','out for dilivery','dilivered'],
    default:'food processing'
}
},{timestamps:true})
module.exports=mongoose.model('order',OrderSchema)