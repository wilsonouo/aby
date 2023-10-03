var express = require('express');
var router = express.Router();

//const MemberModifyMethod = require('../controllers/modify_controller');
//var memberModifyMethod = new MemberModifyMethod();

// register
const toRegister = require('../models/register_model');
const crypto = require('../models/encryption_pwd');
router.post('/register', (req, res, next) => {

    
    // get the info from client
    const memberData = {
        name: req.body['username'],
        password: crypto(req.body['password'])
    }

    //console.log(memberData);

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

});


// login
var toLogin = require('../models/login_model');
var checknull = require('../service/member_check');
var jwt = require('jsonwebtoken');
router.post('/login', (req, res, next) => {
    
    // get the info from client
    const memberData = {
        name: req.body['username'],
        password: crypto(req.body['password'])
    }

    //console.log(memberData);

    // write into the db
    toLogin(memberData).then( (rows) => {

        if(checknull(rows) == true) {
            // fail
            res.json({
                status: "fail",
                err: "Please enter correct account or password!"
            });
        }
        else if(checknull(rows) == false){

            // produce a toke
            const token = jwt.sign({
                algorithm: 'HS256',
                data: rows[0].id
            }, 'secret');
            res.setHeader('token', token);
            res.json({
                status: "successful",
                loginMember: "Welcome " + rows[0].name + "!"
            });

        }

    })

});


// receive the info from logined client (match)
var analyzeToken = require('../models/verification_member');
router.put('/inmember', (req, res, next) => {
    
    // get the info from token's header
    const token = req.header('token');
    
    if(checknull(token) === true) {
        // fail
        res.json({
            err: "Please pass a token in header"
        });
    }
    // check if the header has the token
    else if(checknull(token) === false){

        analyzeToken(token).then( (tokenResult) => {
            if(tokenResult === false) {
                res.json({
                    result: {
                        status: "token error",
                        err: 'Please re Login'
                    }
                });
            }
            else {
                //console.log(tokenResult);
                res.json({
                    test: "token correct"
                })
            }
        });
    }

});


// receive the info from logined client, the require is to update the friend list (update)
var selectmem = require('../models/updateList_model');
router.put('/update', (req, res, next) => {
    
    // get the info from token's header
    //console.log('ddd');
    const token = req.header('token');
    
    if(checknull(token) === true) {
        // fail
        res.json({
            err: "Please pass a token in header"
        });
    }
    // check if the header has the token
    else if(checknull(token) === false){

        analyzeToken(token).then( (tokenResult) => {
            if(tokenResult === false) {
                res.json({
                    result: {
                        status: "token error",
                        err: 'Please re Login'
                    }
                });
            }
            else {
                selectmem(tokenResult).then((memberResult) => {
                    res.json({
                        member: memberResult
                    })
                });
            }
        });
    }

});


// get the interest list
var InterestUpdate = require('../models/listInterest_model');
router.post('/interest', (req, res, next) => {
    
    // get the info from token's header
    const token = req.header('token');
    //console.log(req.body);
    
    if(checknull(token) === true) {
        // fail
        res.json({
            err: "Please pass a token in header"
        });
    }
    // check if the header has the token
    else if(checknull(token) === false){

        analyzeToken(token).then( (tokenResult) => {
            if(tokenResult === false) {
                res.json({
                    result: {
                        status: "token error",
                        err: 'Please re Login'
                    }
                });
            }
            else {
                // get the id successfully
                const memberData = {
                    server: req.body['server_to_vector'][0],
                    client: req.body['client_to_vector'][0],
                    id: tokenResult
                }
                InterestUpdate(memberData).then((memberResult) => {
                    //console.log(memberResult);
                    res.json({
                        memberResult
                    })
                });
            }
        });
    }

});


// match to see if they match or not
var toMatch = require('../models/match_model');
var toAby = require('../models/abycompare_model');
router.put('/match', (req, res, next) => {
    
    // get the info from token's header
    const token = req.header('token');
    
    if(checknull(token) === true) {
        // fail
        res.json({
            err: "Please pass a token in header"
        });
    }
    // check if the header has the token
    else if(checknull(token) === false){

        analyzeToken(token).then( (tokenResult) => {
            if(tokenResult === false) {
                res.json({
                    result: {
                        status: "token error",
                        err: 'Please re Login'
                    }
                });
            }
            else {
                // get the id which is going to match
                var memberId = [];
                memberId.push(tokenResult);
                memberId.push(Number(req.body['MatchId']));
                toMatch(memberId).then((matchResult) => {

                    // get the info from sql which is server and client
                    const abyInfo = {
                        server0: matchResult[0].server,
                        client0: matchResult[0].client,
                        server1: matchResult[1].server,
                        client1: matchResult[1].client
                    };

                    //console.log(abyInfo);

                    console.time('Execution_Time');
                    toAby(abyInfo).then((abyResult) => {
                        console.timeEnd('Execution_Time');
                        var matched = true;
                        // the match failed
                        //console.log(abyResult);
                        if(abyResult < 0.3){
                            matched = false;
                        }
                        res.json({
                            result: matched
                        })
                    });
                    
                });
            }
        });
    }

});

module.exports = router;