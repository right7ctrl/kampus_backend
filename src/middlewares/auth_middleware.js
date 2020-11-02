
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token');
        res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
        if(!req.headers.authorization) throw Error;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.headers.parsedToken = decodedToken;
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