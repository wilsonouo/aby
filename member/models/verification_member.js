const jwt = require('jsonwebtoken');

module.exports = function verifyToken(token) {
    let tokenResult = "";
    return new Promise((resolve, reject) => {
        // take the token info
        if(token) {
            jwt.verify(token, 'secret', function (err, decoded) {
                
                // check if token is explored 
                if(err) {
                    tokenResult = false;
                    resolve(tokenResult);
                }
                else {
                    // return client id
                    tokenResult = decoded.data;
                    resolve(tokenResult);
                }
            });
        }
    });
}