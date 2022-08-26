const express=require('express')
const getProfile = require('../../controllerls/profileControllers/getprofile')
const auth=require('../../middleware/auth')

const router=express.Router()

// @route     /api/profile/me
// @desc      get current user profile
// access     private
router.get('/me',auth,getProfile)

module.exports=router