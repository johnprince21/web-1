// import
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../jwt.utils");

// validate Token
function validateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]; // Remove 'Bearer ' prefix
            const isValid = jwt.verify(token, SECRET_KEY);

            // Attach decoded token data to req.user
            if (isValid) {
                req.user = isValid;
                next();
            }
        } else {
            return res.status(403).json({
                message: "Token is missing",
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: "Token is invalid or expired",
            error: err.message
        });
    }
}

module.exports = { validateToken };