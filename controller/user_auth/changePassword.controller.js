// import
const User = require('../../models/User.Model');
const bcrypt = require('bcrypt');

// Router
const changePasswordRouter = require("express").Router();

// Change password
changePasswordRouter.patch('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        //change password
        if (!password) {
            return res.status(400).json({
                message: 'Password is required'
            });
        }

        // validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            });
        }

        // check if user exists already
        const user = await User.findOneAndUpdate({ email, password });

        // if user not found, return error
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update user password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password changed successfully',
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error changing password',
            error: err.message
        });
    }
});

module.exports = changePasswordRouter;