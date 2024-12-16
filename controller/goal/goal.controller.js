// import 
const track = require('../../models/Goal.Model');
const { validateToken } = require('../../middleware/user.middleware');
const mongoose = require('mongoose');

//Router
const goalTrackRouter = require("express").Router();

// Post all the Goal Tracks
goalTrackRouter.post('/', validateToken, async (req, res) => {
    try {
        const { RunningGoal,
            RunningCurrentValue,
            cyclingGoal,
            cyclingCurrentValue,
            sleepingGoal,
            sleepingCurrentValue,
            weightlossGoal,
            weightlossCurrentValue,
            walkingGoal,
            walkingCurrentValue,
            waterGoal,
            waterCurrentValue,
            CaloriesGoal,
            CaloriesCurrentValue,
        } = req.body;
        const userId = req.user._id;

        console.log(req.body);

        const newGoalTrack = new track({
            userId,
            RunningGoal,
            RunningCurrentValue,
            cyclingGoal,
            cyclingCurrentValue,
            sleepingGoal,
            sleepingCurrentValue,
            weightlossGoal,
            weightlossCurrentValue,
            walkingGoal,
            walkingCurrentValue,
            waterGoal,
            waterCurrentValue,
            CaloriesGoal,
            CaloriesCurrentValue,
        });
        await newGoalTrack.save();

        res.status(201).json({
            message: "Goal Track saved successfully",
            success: true,
            data: newGoalTrack
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to save goal track",
            success: false,
            error: err.message
        });
    }
});

// Get all the Goal Tracks by user
goalTrackRouter.get('/view', validateToken, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all Goals and Tarckings for the authenticted user
        const goalTrack = await track.find({ userId });

        res.status(200).json({
            message: "Goal Tracks fetched successfully",
            success: true,
            data: goalTrack
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch goal tracks",
            success: false,
            error: err.message
        });
    }
});


// Edit the Goals and Trackings for the authenticated user
goalTrackRouter.patch('/:id', validateToken, async (req, res) => {
    try {
        // ID of the Goal Tracker to patch
        const goalTrackId = req.params.id;

        //user ID from token
        const userId = req.user._id;

        //validate if the goalTrackId is a valid objectID
        if (!mongoose.Types.ObjectId.isValid(goalTrackId)) {
            return res.status(400).json({
                message: "Invalid goal track ID",
                success: false
            });
        }

        const updatedGoal = await track.findOneAndUpdate(
            { _id: goalTrackId, userId: userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({
                message: "Goal Track not found for this user",
                success: false
            });
        }

        res.status(200).json({
            message: "Goal Track updated successfully",
            success: true,
            data: updatedGoal
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update goal track",
            success: false,
            error: err.message
        });
    }
});

// Delete the Goal Track for the authenticated user
goalTrackRouter.delete('/:_id', validateToken, async (req, res) => {
    try {
        // ID of the Goal Tracker to delete
        const goalTrackId = req.params._id;

        //user ID from token
        const userId = req.user._id;

        //validate if the goalTrackId is a valid objectID
        if (!mongoose.Types.ObjectId.isValid(goalTrackId)) {
            return res.status(400).json({
                message: "Invalid goal track ID",
                success: false
            });
        }

        // Find and Delete the Goal Track by ID and user ID
        const deletedGoalTrack = await track.findOneAndDelete({
            _id: goalTrackId,
            userId: userId
        });

        if (!deletedGoalTrack) {
            return res.status(404).json({
                message: "Goal Track not found for this user",
                success: false
            });
        }

        res.status(200).json({
            message: "Goal Track deleted successfully",
            success: true,
            data: deletedGoalTrack
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete goal track",
            success: false,
            error: err.message
        });
    }
});


// export

module.exports = goalTrackRouter;