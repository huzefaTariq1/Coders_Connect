const express=require('express')

const router=express.Router()

// @route     /api/users
// @desc      testing route
// access     public
router.get('/',(req,res)=>res.send('checling user route'))

module.exports=router