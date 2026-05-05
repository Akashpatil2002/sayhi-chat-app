import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h", // optional
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",

        // ❌ REMOVE THIS
        // maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};