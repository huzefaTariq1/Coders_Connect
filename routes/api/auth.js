const express=require('express')

const router=express.Router()

const auth=require('../../middleware/auth')

const getAutorizedData=require('../../controllerls/authcontroller')

const loginAndToken=require('../../controllerls/loginAndGetToken')


// @route     /api/auth
// @desc      geting user data
// access     private
router.get('/',auth,getAutorizedData)



// @route     /api/auth
// @desc      authenticate and get token
// access     public
router.post('/',loginAndToken)
module.exports=router