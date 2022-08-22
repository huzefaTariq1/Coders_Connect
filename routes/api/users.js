const express = require('express')
const { body, validationResult } = require('express-validator')

const router = express.Router()

// @route     /api/users
// @desc      testing route
// access     public
router.post('/', 
[
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({min:6})
], (req, res) => {
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    res.send('api running')
})

module.exports = router