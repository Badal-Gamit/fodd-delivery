
const jwt = require('jsonwebtoken');
const usermodel=require('../Model/UserModel');
const { hashPaasword,passwordCompare } = require('../helper/passwordHelper');


const RegistrationController=async(req,res)=>{
     const {name, email, address, phoneNumber, password}=req.body
   
       
    try {
          const userexist=await usermodel.findOne({email});
         
          
          if (userexist) return res.status(201).json({message:"user already exist"})    
        const encryptPassword=  await hashPaasword(password);
 const user=await   usermodel.create({
        name,
        email,
        address,
        phoneNumber,
       password:encryptPassword})
      const token= jwt.sign(email,"private")
       res.status(200).json({message:"succesfully created",token,user})

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:"failed to register",
            error
        })
    }
}

const loginController=async(req,res)=>{

    const { email,password}=req.body
   
    try {
          const user=await usermodel.findOne({email});
          if (!user)return  res.status(201).json({message:"wrong email or password"}) 
          const result = await passwordCompare(password,user.password)
        if (!result)   return    res.status(201).json({message:"wrong email or password"}) 
            const token= jwt.sign(email,"private")
            return  res.status(200).json({message:"succesfully login",user,token}) 
   } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:"failed to login",
            error
        })
    }}

const updateControler=async(req,res)=>{
   try {   
  const {phoneNumber,address }=req.body;    
    const user= await usermodel.findOne({email:req.user});
    if (phoneNumber!=user.phoneNumber){
         user.phoneNumber=phoneNumber
        await   user.save()
        return  res.status(200).json({message:"succesfully Number update",user}) 
    } 
    if (address!=user.address){
        user.address=address
       await   user.save()
       return  res.status(200).json({message:"succesfully address update",user}) 
   } 

      
       
    
   } catch (error) {
    res.status(500).json({
        message:"failed to update",
        error
    })
   }
}
module.exports={loginController,RegistrationController,updateControler }