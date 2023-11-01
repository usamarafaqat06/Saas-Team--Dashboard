const jwt = require("jsonwebtoken");

const checkUserAuth = (req, res, next) => {
    const token =  req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({status: false, message: "Unauthorized token not found"}) 
    }
    return jwt.verify(token, 'secret_is_a_secret_for_user', (err, decoded) => {
        if(err) {
            return res.status(400).json({status: false, message: "invalid Token"})
        }
        req.user = decoded;
        return next()
    })
}
exports.checkUserAuth = checkUserAuth