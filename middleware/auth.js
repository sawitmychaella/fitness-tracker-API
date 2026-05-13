const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {

        return res.status(401).send({
            message: "Authorization failed"
        });

    }

    token = token.split(" ")[1];

    try {

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        req.user = decodedToken;

        next();

    } catch (error) {

        return res.status(401).send({
            message: "Invalid token"
        });

    }

};