const db = require('./connection_db');

module.exports = function findMember(id){
    let result = {};
    let members = [];
    members.push(id);
    return new Promise((resolve, reject) => {

        //
        db.query('SELECT MAX(id) AS max_id FROM member_info', function(err, rows) {
        
            // failed
            if(err) {
                console.log(err);
                result.status = "fail";
                result.err = "try again";
                reject(result);
                return;
            }
            var selectMember = 0;
            var max_id = rows[0].max_id;
            while(selectMember < 2){
                
                var member = Math.floor(Math.random()*(max_id-15)) + 15;
                var getTheMember = true;
                for(let i = 0;i < members.length;i++){
                    if(member == members[i]){
                        getTheMember = false;
                        break;
                    }
                }
                if(getTheMember){
                    members.push(member);
                    selectMember++;
                }
                
            }
            members.shift();
            resolve(members);
        })
        
    });
    
}