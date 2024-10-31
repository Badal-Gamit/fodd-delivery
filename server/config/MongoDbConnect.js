const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.mangodbURL).
then(()=>{console.log('sucessfully coonect to database')}).
catch((err)=>{console.log(err);
 })