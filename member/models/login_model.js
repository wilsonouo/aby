const db = require('./connection_db');

module.exports = function register(memberData){
    let result = {};
    return new Promise((resolve, reject) => {

        // check if the user has the same id
        db.query('SELECT * FROM member_info WHERE name = ? AND password = ?', [memberData.name, memberData.password], function(err, rows) {

            // failed
            if(err) {
                console.log(err);
                result.status = "fail";
                result.err = "try again";
                reject(result);
                return;
            }
            resolve(rows);
            
        })

    });
}