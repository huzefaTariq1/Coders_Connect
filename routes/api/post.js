const express=require('express')

const router=express.Router()

// @route     /api/profile
// @desc      testing route
// access     public
router.get('/',(req,res)=>res.send('checling profile route'))

module.exports=router