const express=require('express')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')
const userRoute=require('./routes/api/users')
const profileRoute=require('./routes/api/profile')
const postRoute=require('./routes/api/post')
const authRoute=require('./routes/api/auth')

const app=express()

connectDB()


// defining routes
app.use('/api/users',userRoute)
app.use('/api/profile',profileRoute)
app.use('/api/post',postRoute)
app.use('/api/auth',authRoute)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>console.log(`app is running on ${PORT}`))

