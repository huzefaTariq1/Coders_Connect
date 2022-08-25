const express=require('express')

const router=express.Router()

const auth=require('../../middleware/auth')

const getAutorizedData=require('../../controllerls/authcontroller')

// @route     /api/auth
// @desc      testing route
// access     public
router.get('/',auth,getAutorizedData)

module.exports=router