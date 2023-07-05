const jwt = require('jsonwebtoken');

const secret = 'mysecretshh';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) { //Need to verify the token
        let token = req.body.token || req.query.token || req.headers.authorization; //Tries to find the token

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid Token');
        }

        return req;
    },
    signToken: function ({email, name, _id}) { //This function creates the JSON Web Token
        const payload = { email, name, _id };
        return jwt.sign({data: payload }, secret, { expiresIn: expiration });
    },
};