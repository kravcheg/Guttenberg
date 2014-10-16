'use strict';

const fs = require('fs'),
path = process.argv[2],
text = process.argv[3];

if(!(text && path)) {
    throw Error('missing args');
}

fs.writeFile(path, text , function (err, text){
    if (!err) {
        console.log ("success ! ");
    } else {
        throw err;
    }
});


fs.readFile(path,  function (err , data){
    if (err) {
        throw err;
    } else {
        console.log("success ! : reading from  "+ path + "file content :  " + data.toString());
    }
});
