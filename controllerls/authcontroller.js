const User=require('../models/Users')

const getAutorizedData=async(req,res)=>{
    try {
       const user=await User.findById(req.user.id).select('-password')
       res.send(user)
    } catch (error) {
        res.status(500).send("server error")
        console.log(error.message)
    }
}


module.exports=getAutorizedData