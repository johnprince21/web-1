# Fitness App Backend API

- This backend API serves as the core for a fitness app, supporting user authentication, nutrition goal tracking, exercise modeling, and goal tracking. It is built with Node.js, Express.js, and MongoDB.

## Table of Contents

- Installation
- Environment Variables
- API Endpoints
- Middleware
- Controllers
- Error Handling
- Contributing

### Environment Variables

- **PORT**: The port where the server listens.
- **HOSTNAME**: The server hostname.
- **SECRET_KEY**: Secret key used for JWT signing.
- **MONGO_URI**: MongoDB connection string.

#### User Authentication

**Register**
    - POST /register
    - Creates a new user with a hashed password.

**Login**
    - POST /login
    - Authenticates a user and returns a JWT token if successful.

**Forgot Password**
    - POST /forgotpassword
    - Generates an OTP and sends it to the user's email for password recovery.

**Change Password**
    - PATCH /changepassword
    - Allows users to change their password.

**Dashboard**
    **Dashboard Data**
        - GET /dashboard
        - Retrieves data for the user’s personalized dashboard.
    **Nutrition Goals**
        -POST /nutritiongoal
        -Creates or updates the user's nutrition goals.
    **Exercise Models**
        - POST /exercisemodels
        - Manages various exercise models and their properties.
    **Goal Tracking**
        - POST /goaltrackers
        - Enables tracking of user-defined goals.

**Token Validation**
    - **File**: middleware/validateToken.js
    - **Description**: Validates JWT tokens attached to requests in the authorization header.

**Password Hashing**
    - **File**: controllers/user_auth/register.controller.js
    -Hashes the user password before saving it to the database.

**Error Handling**
- Each route handler includes basic error handling that returns appropriate HTTP status codes and error messages.

- **401 Unauthorized**: Invalid or missing JWT token.
- **403 Forbidden**: Missing token.
- **500 Internal Server Error**: Unhandled server errors.