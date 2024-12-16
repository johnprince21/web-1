//import
const userModel = require('../../models/User.Model');
const bcrypt = require('bcrypt');

//Router
const userRouter = require("express").Router();

//Register user

userRouter.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const { username, email, age, gender, height, weight, goals, created_at } = req.body;

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            height,
            weight,
            goals,
            created_at
        });
        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
});

//export
module.exports = userRouter;