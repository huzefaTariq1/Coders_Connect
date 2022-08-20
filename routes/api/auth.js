const express=require('express')

const router=express.Router()

// @route     /api/auth
// @desc      testing route
// access     public
router.get('/',(req,res)=>res.send('checling auth route'))

module.exports=router