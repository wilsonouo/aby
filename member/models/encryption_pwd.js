const crypto = require('crypto');

module.exports = function getSPwd(password) {
    
    // crypto (md5)
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    return password;
}