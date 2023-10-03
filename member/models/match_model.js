const db = require('./connection_db');

module.exports = function selectInfo(memberId){
    let result = [];
    return new Promise((resolve, reject) => {

        // check if the user has the same id
        //console.log(memberId);
        db.query('SELECT * FROM member_info WHERE id = ? OR id = ?', [memberId[0], memberId[1]], function(err, rows) {

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
