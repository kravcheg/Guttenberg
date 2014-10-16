'use strict';

const fs = require('fs'),
moment = require ('moment'),
net = require ('net'),
fileName = process.argv[2],
server = net.createServer(function (connection){
    console.log ('suscriber connected');
    connection.write('watching ' + fileName + ' for changes')  ;
    let watcher = fs.watch(fileName, function () {
        connection.write('watched file  ' + fileName + ' chsnged at '  + Date.now() + '\r\n ')  ;
    });

    connection.on('close', function () {
        console.log("connection closed ");
        watcher.close(0,"dropped telnet");
    });
});


if(!fileName) {
    throw Error('A file to watch must be specified!');
}

server.listen(7643, function (){
    console.log ('listeninig for subscribers');
});

