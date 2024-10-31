const jwt=require('jsonwebtoken');
const usermodel =require('../Model/UserModel')
const isverify=(req,res,next)=>{ 
  const token=req.headers?.authorization?.split(' ') || ""; 
 try {
 if (!token) return res.status(302).json({message:"unauthorization access"});
    const decode=jwt.verify(token[1],"private")
    req.user=decode
    next()
 } catch (error) {
    return res.status(302).json({message:error.message});
 }
}
 
const isadmin=async(req,res,next)=>{
    const token=req.headers?.authorization?.split(' ')
    try {
    if (!token) return res.status(302).json({message:"unauthorization access"});
       const decode=jwt.verify(token[1],"private")
       const user=await usermodel.findOne({email:decode})
       if (!user.isAdmin)return  res.status(303).json({message:"admin access required"});
       next()
    } catch (error) {
       return res.status(302).json({message:error.message});
    }

}

module.exports={isverify,isadmin}
