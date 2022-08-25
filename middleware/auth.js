const JWT =require('jsonwebtoken')

const auth=(req,res,next)=>{
   // get token from header
   const token=req.header('x-auth-token');

   // check if token or not
   if (!token){
    res.status(401).json({msg:"No token found,access denied"});
   }

   // verify token
   try {
    const decoded=JWT.verify(token,process.env.SECRECT_TOKEN);
    
    req.user=decoded.user;

    next();
   } catch (error) {
    res.status(401).json({msg:"Token not valid"})
    console.error(error.message)
   }
}

module.exports=auth