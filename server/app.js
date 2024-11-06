const express=require('express')
const path=require('path')
require('./config/MongoDbConnect')
const authRoute=require('./routes/authRoute')
const menuRoute=require('./routes/menuRoute')
const orderRoute=require('./routes/orderRoute')
const app=express()
const cors=require('cors')
const port= process.env.PORT || 3000

app.use(express.urlencoded());
app.use(express.json())
app.use(cors({
    origin:["https://food-dilivery-xyz.netlify.app"]
}
))



app.use('/auth',authRoute)
app.use('/menu',menuRoute)
app.use('/order',orderRoute)
console.log(__dirname, path.resolve());


app.listen(port,()=>console.log(`server is run on port  ${port}`))
