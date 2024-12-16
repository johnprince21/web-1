// import
const exeModel = require('../../models/Exercise.Model');
const { validateToken } = require('../../middleware/user.middleware');
const mongoose = require('mongoose');

// Router
const exeModelRouter = require("express").Router();

// Post all the Exercise Models
exeModelRouter.post("/", validateToken, async (req, res) => {
    try {
        const { type, duration, distance, caloriesBurned, date } = req.body;
        const userId = req.user._id;

        const newExercise = new exeModel({
            userId,
            type,
            duration,
            distance,
            caloriesBurned,
            date
        });

        await newExercise.save();

        res.status(201).json({
            message: "Exercise Models saved successfully",
            success: true,
            data: newExercise
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to save exercise models",
            success: false,
            error
        });
    }
});

// Get all Exercise Models by User
exeModelRouter.get("/view", validateToken, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all Exercise Model for the authenticated user
        const exercises = await exeModel.find({ userId });

        res.status(200).json({
            message: "Exercise Models fetched successfully",
            success: true,
            data: exercises
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch exercise models",
            success: false,
            error: error.message
        });
    }
});

// Edit the Exercise Model for a user
exeModelRouter.patch('/:_id', validateToken, async (req, res) => {
    try {
        // ID of the Exercise Model to patch
        const exeId = req.params._id;

        // user ID from token
        const userId = req.user._id;

        // Validate if the exeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(exeId)) {
            return res.status(400).json({
                message: "Invalid exercise model ID",
                success: false
            });
        }

        const updatedexe = await exeModel.findOneAndUpdate(
            { _id: exeId, userId: userId },
            { $set: req.body }, // Only update fields provided in req.body
            { new: true, runValidators: true } // Options to return the updated document and validate
        );

        if (!updatedexe) {
            return res.status(404).json({
                message: "Exercise model not found or you don't have permission to edit it",
                success: false
            });
        }

        res.status(200).json({
            message: "Exercise model updated successfully",
            success: true,
            data: updatedexe
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to edit exercise model",
            success: false,
            error: error.message
        });
    }
});


// Delete the Exercise Model for a user

exeModelRouter.delete('/:_id', validateToken, async (req, res) => {
    try {
        // ID of the Exercise Model to delete
        const exeId = req.params._id;

        // user ID from token
        const userId = req.user._id;

        // Validate if the exeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(exeId)) {
            return res.status(400).json({
                message: "Invalid exercise model ID",
                success: false
            });
        }

        //Fiind and delete the Exercise Model by ID and user ID
        const deletedExe = await exeModel.findOneAndDelete(
            { _id: exeId, userId: userId }
        );

        if (!deletedExe) {
            return res.status(404).json({
                message: "Exercise model not found or you don't have permission to delete it",
                success: false
            });
        }

        res.status(200).json({
            message: "Exercise model deleted successfully",
            success: true,
            data: deletedExe
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete exercise model",
            success: false,
            error: error.message
        });
    }
});


module.exports = exeModelRouter;