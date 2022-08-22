const express = require('express')
const { body, validationResult } = require('express-validator')
const User=require('../../models/Users')
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const { findOne } = require('../../models/Users')
const router = express.Router()

// @route     /api/users
// @desc      testing route
// access     public
router.post('/', 
[
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({min:6})
], async (req, res) => {
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
     
    const {name,email,password}=req.body
    try {
      // check user already exist
      let user=await User.findOne({email});
      if(user){
        res.status(400).json({errors:[{msg:"user alrady exists"}]});
      }


      // get avatar
     const avatar=gravatar.url(email,{
      s:'200',
      r:'pg',
      d:'mm'
     });

   
     

     user=new User({
      name,
      email,
      password,
      avatar
     });




     // encrypt password
     const salt=await bcrypt.genSalt(10);

     user.password=await bcrypt.hash(password,salt)

     const createdUser=await user.save()

     res.status(200).send(createdUser)

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error')
    }
   

})

module.exports = router