const db = require('./connection_db');

module.exports = function register(memberData){
    let result = {};
    return new Promise((resolve, reject) => {

        // check if the user has the same id
        db.query('SELECT name FROM member_info WHERE name = ?', memberData.name, function(err, rows) {

            // failed
            if(err) {
                console.log(err);
                result.status = "fail";
                result.err = "try again";
                reject(result);
                return;
            }
            // there are more than one the same name
            if(rows.length >= 1) {
                result.status = "Register failed";
                result.err = "The name is already registered";
                reject(result);
            }
            else {  // write into db
                
                db.query('INSERT INTO member_info SET ?', memberData, function(err, rows) {
            
                    // failed
                    if(err) {
                        console.log(err);
                        result.status = "fail";
                        result.err = "try again";
                        reject(result);
                        return;
                    }
                    result.status = "register successful";
                    result.registerMember = memberData;
                    resolve(result);
        
                });
            }

        })


        
    });
}