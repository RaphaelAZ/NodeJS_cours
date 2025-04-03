const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (role) => {
    return (req, res, next) => {
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({
                'message': 'You must be logged in to do this action.'
            });
            return;
        }

        try {
            req.token = jwt.verify(token, process.env.JWT_KEY);
            if(role && !req.token.roles?.some(role => role.label === role)){
                return res.status(403).json({error: "Vous n'avez pas les droits pour réaliser cette action"});
            }
            next();
        } catch (e) {
            res.status(401).json({
                'message': 'Your credentials are not valid.'
            });
        }

        
    }
}