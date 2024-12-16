const mongoose = require('mongoose');

//Schema
const nutritiongoalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    },
});

const nutritiongoalModel = mongoose.model('Nutrition_Goal', nutritiongoalSchema);

module.exports = nutritiongoalModel;