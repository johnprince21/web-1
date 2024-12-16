// import
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Secret key
const SECRET_KEY = process.env.JWT_TOKEN;

// Token generated
function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1h"
    });
    return token;
}

// expire token
module.exports = { generateToken, SECRET_KEY };
