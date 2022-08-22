const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const {signup}=require('../../controllerls/userController')

// @route     /api/users
// @desc      testing route
// access     public
router.post('/', 
[
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({min:6})
], signup)

module.exports = router