const express=require('express')
const createAndUpdateProfile = require('../../controllerls/profileControllers/createAndUpdate')
const getProfile = require('../../controllerls/profileControllers/getprofile')
const auth=require('../../middleware/auth')
const { body, validationResult } = require('express-validator');

const router=express.Router()

// @route     /api/profile/me
// @desc      get current user profile
// access     private
router.get('/me',auth,getProfile)


// @route     /api/profile
// @desc      create and update profile
// access     private
router.post('/',[
auth,
[
body('status').not().isEmpty(),
body('skills').not().isEmpty()
]
],
createAndUpdateProfile)


module.exports=router