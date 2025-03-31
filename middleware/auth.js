const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, "mysecretkey123", (err) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalide' });
            }
            req.token = token;
            next();
        });
    } else {
        return res.status(401).json({ message: 'Accès non authorisé' });
    }
};

module.exports = authRequired;