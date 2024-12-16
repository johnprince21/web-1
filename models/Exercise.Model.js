const mongoose = require('mongoose');

//Schema
const exerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        // running, cycling, strength training
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const exerciseModel = mongoose.model('Exercise', exerciseSchema);

module.exports = exerciseModel;
