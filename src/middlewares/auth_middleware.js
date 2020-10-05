
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.headers['parsedToken'] = decodedToken;
        next();

    } catch (e) {
        console.log(e);
        return res.status(401).send({
            response: 2,
            message: 'Auth failed',
        });
    }


}
module.exports = authMiddleware;