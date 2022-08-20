const express=require('express')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')

const app=express()

connectDB()

app.get('/',(req,res)=>res.send(`api testing`))

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>console.log(`app is running on ${PORT}`))