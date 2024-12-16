const mongoose = require('mongoose');

//schema
const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    RunningGoal: {
        type: Number,
        required: true
    },
    RunningCurrentValue: {
        type: Number,
        required: true
    },
    cyclingGoal: {
        type: Number,
        default: 0
    },
    cyclingCurrentValue: {
        type: Number,
        required: true
    },
    sleepingGoal: {
        type: Number,
        required: true
    },
    sleepingCurrentValue: {
        type: Number,
        default: 0
    },
    weightlossGoal: {
        type: Number,
        required: true
    },
    weightlossCurrentValue: {
        type: Number,
        required: true
    },
    walkingGoal: {
        type: Number,
        default: 0
    },
    walkingCurrentValue: {
        type: Number,
        required: true
    },
    waterGoal: {
        type: Number,
        required: true
    },
    waterCurrentValue: {
        type: Number,
        default: 0
    },
    CaloriesGoal: {
        type: Number,
        required: true
    },
    CaloriesCurrentValue: {
        type: Number,
        required: true
    },
});

const goalModel = mongoose.model('Goal', goalSchema);

module.exports = goalModel;