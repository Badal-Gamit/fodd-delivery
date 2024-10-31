const express=require('express')
require('./config/MongoDbConnect')
const authRoute=require('./routes/authRoute')
const menuRoute=require('./routes/menuRoute')
const orderRoute=require('./routes/orderRoute')
const app=express()
const cors=require('cors')
const port= process.env.port || 3000

app.use(express.urlencoded());
app.use(express.json())
app.use(cors())

app.use('/auth',authRoute)
app.use('/menu',menuRoute)
app.use('/order',orderRoute)


app.listen(port,()=>console.log(`server is run on port  ${port}`))
