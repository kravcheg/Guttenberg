'use strict';

const fs = require('fs')
    , childrish_proc = require('child_process').spawn
    , fileName = process.argv[2];

if(!fileName) {
    throw Error('A file to watch must be specified!');
}

fs.watch(fileName, function() {

    let ls = childrish_proc('ls', ['-lh', fileName]),
    output = '';
    ls.stdout.on('data' , function(chunk){

        output+= ( chunk.toString() + "\n");
    });

    ls.on('close' , function (){
        console.log ("file " + fileName + "  touched : " + output);
    });
});

console.log('Now watching {file-name} for changes...'.replace('{file-name}', fileName))