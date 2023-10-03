const { exec } = require('child_process');


module.exports = function selectInfo(InterestInfo){
    let result = [];
    //console.log(InterestInfo);
    var exeParameterMember0 = './new_similarity_test -r 0 -v ' + InterestInfo.server0 + ' -c ' + InterestInfo.server1;
    var exeParameterMember1 = './new_similarity_test -r 1 -v ' + InterestInfo.client0 + ' -c ' + InterestInfo.client1; 
    return new Promise((resolve, reject) => {

        exec(exeParameterMember0 + ' & ' + exeParameterMember1,(error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error}`);
                result.status = "fail";
                result.err = "aby err";
                reject(result);
                return;
            }
            resolve(stdout);
        });

    });
}


