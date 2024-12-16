//import
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const createDbConnection = require('./dbConnection');
const registerController = require('./controller/user_auth/register.controller');
const loginController = require('./controller/user_auth/login.controller');
const forgotpasswordController = require('./controller/user_auth/forgotPassword.controller');
const passwordController = require('./controller/user_auth/changePassword.controller');
const dashboardController = require('./controller/dashboard.controller');
const nuteritiongoalController = require('./controller/NutritionGoals/nutritionGoal.controller');
const exercisemodelController = require('./controller/ExerciseModel/exercisemodel.controller');
const goaltrackersController = require('./controller/goal/goal.controller')

// Create a database connection
createDbConnection()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

//create express API_SERVER
const API_SERVER = express();

//passing incoming request body as a json
API_SERVER.use(cors());
API_SERVER.use(express.json());

//controllers injections
API_SERVER.use('/register', registerController);
API_SERVER.use('/login', loginController);
API_SERVER.use('/forgotpassword', forgotpasswordController);
API_SERVER.use('/changepassword', passwordController);
API_SERVER.use('/dashboard', dashboardController);
API_SERVER.use('/nutritiongoal', nuteritiongoalController);
API_SERVER.use('/exercisemodels', exercisemodelController);
API_SERVER.use('/goaltrackers', goaltrackersController);

//start and listen to the server
API_SERVER.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log("Server started");
    console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`)
});