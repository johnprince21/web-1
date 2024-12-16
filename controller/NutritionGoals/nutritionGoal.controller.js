// import
const nutGoal = require('../../models/NutritionGoal.Model');
const { validateToken } = require('../../middleware/user.middleware');
const mongoose = require('mongoose');

// Router
const nutGoalRouter = require("express").Router();

// post all nutrition goals
nutGoalRouter.post('/', validateToken, async (req, res) => {
    try {
        const { date, foodName, calories, protein, carbohydrates, fats } = req.body;
        const userId = req.user._id;

        const newNutGoal = new nutGoal({
            userId,
            date,
            foodName,
            calories,
            protein,
            carbohydrates,
            fats
        });
        await newNutGoal.save();

        res.status(201).json({
            message: "Nutrition goal added successfully",
            success: true,
            data: newNutGoal
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding nutrition goal",
            error: err.message
        });
    }
});


// get all nutrition goals for a user
nutGoalRouter.get('/view', validateToken, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all nutrition goals for the authenticated user
        const nutGoals = await nutGoal.find({ userId });

        res.status(200).json({
            message: "Nutrition goals retrieved successfully",
            success: true,
            data: nutGoals
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving nutrition goals",
            error: err.message
        });
    }
});


// Edit the nutrition goals for a user
nutGoalRouter.patch('/:_id', validateToken, async (req, res) => {
    try {
        // ID of the nutrition goal to patch
        const goalId = req.params._id;

        // User ID from token
        const userId = req.user._id;

        // Validate if the goalId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(goalId)) {
            return res.status(400).json({
                message: "Invalid goal ID",
                success: false
            });
        }

        const updatedGoal = await nutGoal.findOneAndUpdate(
            { _id: goalId, userId: userId },
            { $set: req.body }, // Only update fields provided in req.body
            { new: true, runValidators: true } // Options to return the updated document and validate
        );

        if (!updatedGoal) {
            return res.status(404).json({
                message: "Nutrition goal not found or user unauthorized",
                success: false
            });
        }

        res.status(200).json({
            message: "Nutrition goal updated successfully",
            success: true,
            data: updatedGoal
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating nutrition goal",
            error: err.message
        });
    }
});

// Delete the nutrition goals for a user
nutGoalRouter.delete('/:_id', validateToken, async (req, res) => {
    try {
        // ID of the nutrition goal to patch
        const goalId = req.params._id;

        // User ID from token
        const userId = req.user._id;

        // Validate if the goalId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(goalId)) {
            return res.status(400).json({
                message: "Invalid goal ID",
                success: false
            });
        }

        // Find and delete the nutrition goal by ID and user ID
        const deletedGoal = await nutGoal.findOneAndDelete(
            { _id: goalId, userId: userId }
        );

        if (!deletedGoal) {
            return res.status(404).json({
                message: "Nutrition goal not found or user unauthorized",
                success: false
            });
        }

        res.status(200).json({
            message: "Nutrition goal deleted successfully",
            success: true,
            data: deletedGoal
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting nutrition goal",
            error: err.message
        });
    }
});


//export
module.exports = nutGoalRouter;