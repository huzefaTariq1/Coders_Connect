const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const JWT = require("jsonwebtoken")
const { body, validationResult } = require('express-validator')


//@ controller function for authenticate and getting token

const loginAndToken = async (req, res) => {
        // validating errors by express-validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body


    try {
        // check wheather user exist or not
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }


        // comaparing password
        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }


        const payload = {
            user: {
                id: user.id
            }
        }

        JWT.sign(
            payload,
            process.env.SECRECT_TOKEN,
            { expiresIn: "1hr" },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        )

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
}

module.exports = loginAndToken