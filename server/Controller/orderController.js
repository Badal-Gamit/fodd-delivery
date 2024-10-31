const braintree=require('braintree');
const orderModel=require('../Model/orderModel')
require('dotenv').config()
const gateway=new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
  merchantId:process.env.Merchant_ID,
  publicKey: process.env.Public_Key,
  privateKey:process.env.Private_Key
});
 
const clientTokenController=async(req,res)=>{
  try {
    console.log('nice')
    gateway.clientToken.generate({},(err,response)=>{
        if (err) {
         ;
          
           return res.status(500).json({message:err})
        }
        
        return res.status(200).send(response) 
     })
  } catch (error) { 
    return res.status(500).json({message:error})
  }
}

const CheckoutController=async(req,res)=>{
  try {
      const {amount,nonce,product}=req.body
      
        const value=amount+5
      gateway.transaction.sale({
        paymentMethodNonce:nonce,
        amount:value,
        options:{
          submitForSettlement:true
        },
      },async(err,result)=>{
          if (err) {
            console.log(err);
            
            return res.json({message:err})
          } else {
      const response=await  orderModel.create({
              buyer:req.params.id,
             product:product,
             payment:result,
             })
           return res.status(200).json({message:"success",response:response})
          }
        } 
      )
  } catch (error) {
    return res.status(500).json({message:error})
  }
}
const UserOrderController=async(req,res)=>{
try {
    const order=  await  orderModel.find({buyer:req.params.id})
    return res.status(200).json({message:"success",order})
} catch (error) {
  return res.status(500).json({message:error})
  
}
}
const orderController=async(req,res)=>{
try {
  const order=  await   orderModel.find({}).populate('buyer').sort({ createdAt:-1})
  return res.status(200).json({message:"success",order})
} catch (error) {
  return res.status(500).json({message:error})
}}

const updateOrderController=async(req,res)=>{
  console.log(req.body)
try {
     const {value}=req.body
     const response= await orderModel.findByIdAndUpdate({_id:req.params.id},{status:value})
     res.status(200).json({message:"sucessfully update"})

} catch (error) {
  res.status(500).json({message:"failed update"})
}
}



module.exports={clientTokenController,CheckoutController,UserOrderController,orderController,updateOrderController }