const { body, validationResult } = require('express-validator')
const User = require('../models/Users')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const JWT = require("jsonwebtoken")





//@ controller function for Signup

const signup = async (req, res) => {
    // validating errors by express-validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }


    const { name, email, password } = req.body


    try {
        // check user already exist
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ msg: "user alrady exists" }] });
        }


        // get avatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });




        user = new User({
            name,
            email,
            password,
            avatar
        });




        // encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save()

const payload={
    user:{
        id:user.id
    }
}

JWT.sign(
    payload,
    process.env.SECRECT_TOKEN,
    {expiresIn:"1hr"},
    (err,token)=>{
        if (err) throw err;
        res.json({token})
    }
)


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
}

module.exports = {
    signup
}