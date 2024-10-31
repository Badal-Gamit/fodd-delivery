const bcrypt=require('bcrypt')

const hashPaasword=async(password)=>{
    const Salt=await bcrypt.genSalt(10);
    const newPassword= await bcrypt.hash(password,Salt)
    return newPassword;
}
const passwordCompare=async(password,encryptpassword)=>{
   const result= await bcrypt.compare(password,encryptpassword)
   return result
}

module.exports={hashPaasword,passwordCompare}