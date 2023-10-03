const db = require('./connection_db');

module.exports = function inputList(memberData){
    let result = {};
    return new Promise((resolve, reject) => {

        console.log(memberData);

        // check if the user has the same id
        db.query('UPDATE member_info SET server = ?, client = ? WHERE id = ?', [memberData.server, memberData.client, memberData.id], function(err, rows) {

            // failed
            if(err) {
                console.log(err);
                result.status = "fail";
                result.err = "try again";
                reject(result);
                return;
            }
            result.status = "list update success"
            resolve(result);
        })

        
    });
}