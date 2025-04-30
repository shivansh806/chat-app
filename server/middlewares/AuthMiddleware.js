import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt; // Get JWT from cookies
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        req.userId = decoded.id; // Attach userId to the request object
        next();
    });
};