// import
const mongoose = require('mongoose');
require("dotenv").config();

// Database URI
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
async function createDbConnection() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Created db connection');
    } catch (err) { 
        console.error('Failed to connect to db:', err.message);
    }
}

// Export the function

module.exports = createDbConnection;