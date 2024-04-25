require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    if (!authHeader) return res.status(401);
    const accessToken = authHeader.split(' ')[1]
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.status(403);
            res.user = decoded.username
            next()
        }
    )
}

module.exports = verifyJwt