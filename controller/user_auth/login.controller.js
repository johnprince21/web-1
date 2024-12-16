// import
const bcrypt = require('bcrypt');
const User = require('../../models/User.Model');
const { generateToken } = require('../../jwt.utils');

// Router
const loginRouter = require("express").Router();

// Login user
loginRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        //get data from server
        const user = await User.findOne({ email });

        //check if user exists
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        //Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = generateToken({ id: user._id, username: user.username });

            return res.status(200).json({
                token: token,
                message: 'Logged in successfully'
            });
        } else {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

//export async function
module.exports = loginRouter;