'use strict';

const fs = require('fs'),
net = require ('net'),
fileName = process.argv[2],
server = net.createServer(function (connection){
    console.log ('suscriber connected');
    connection.write(
        JSON.stringify(
        {
            type: 'watching',
            file: fileName
        })+
            '\r\n'
    );

    let watcher = fs.watch(fileName, function () {
        connection.write(
           JSON.stringify(
               {
                   type: 'changed',
                   file: fileName,
                   timestamp: Date.now()

               })+
            '\r\n ')
    });

    connection.on('close', function () {
        console.log("connection closed ");
        watcher.close(0,"dropped telnet");
    });
});


if(!fileName) {
    throw Error('A file to watch must be specified!');
}

server.listen(7654, function (){
    console.log ('listeninig for subscribers');
});

