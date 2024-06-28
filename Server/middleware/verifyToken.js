// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Invalid Token", error: err.message });
        }
        req.userId = decoded._id;
        next();
    });
};

module.exports = verifyToken;
