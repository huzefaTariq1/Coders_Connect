const Profile=require('../../models/Profile')
const User=require('../../models/Users')

const getProfile=async(req,res)=>{

    try {
        let profile=await Profile.findOne({user:req.user.id}).populate('user',['name', 'avatar']);

        if (!profile){
            return res.status(400).json({msg:"there is no profile for this user"})
        }

        res.json(profile)

    } catch (error) {
        res.status(500).send("server error")
        console.log(error.message)
    }
  

}

module.exports=getProfile