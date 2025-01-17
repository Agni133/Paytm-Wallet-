const { JWT_secret } = require('./config');  // Correct import from config.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part
    try {
        const decoded = jwt.verify(token, JWT_secret); // Verify the token
        req.userId = decoded.userId; // Attach the userId to the request
        next(); // Proceed to the next middleware/route
    } catch (err) {
        console.error("Token verification failed:", err);  // Log error for debugging
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = { authMiddleware };
