const userModel = require('../models/User.Model');
const { validateToken } = require('../middleware/user.middleware');


// Router
const userRouter = require("express").Router();

//Dashboard
userRouter.get('/', validateToken, async function (req, res) {
    try {
        // Access the user ID from decoded token data
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "User profile",
            success: true,
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});


// export userRouter
module.exports = userRouter;