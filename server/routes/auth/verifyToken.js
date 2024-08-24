const config = require("../../../config.js");
// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'NO_TOKEN' });
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_TOKEN);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'INVALID_TOKEN' });
    }
}

module.exports = verifyToken;