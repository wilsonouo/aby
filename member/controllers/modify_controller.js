// cann't work for now, because exports router(), still find the reason
/*const toRegister = require('../models/register_model');

module.exports = class Member {
    
    postRegister(req, res, next) {

        console.log('hi');
        
        // get the info from client
        const memberData = {
            name: req.body['UserName'],
            password: req.body['UserPwd']
        }

        // write into the db
        toRegister(memberData).then( (result) => {
            
            // if writing operation is successful
            res.json({
                status: "successful",
                result: result
            })

        }, (err) => {

            // if failed
            res.json({
                result:err
            })

        })

    }

}
*/


























var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require('crypto');


router.post('/', function(req, res, next) {

  // load the info from register page
  var userName = req.body['UserName'],
      userPwd = req.body['UserPwd'];
  
  
  // debug
  console.log(userPwd);

  // Use md5
  const hash = crypto.createHash('md5');
  userPwd = hash.update(userPwd).digest('hex');

  // debug
  console.log(userPwd);

  

  const cmdInsert = "INSERT INTO member_info(id, name, password) VALUES (0, ?, ?)"
  conn.query( cmdInsert, [userName, userPwd], function(err, fields){

    if(err) throw err;

  });

  conn.end();
      
      
});

module.exports = router;
