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

    /*let watcher = fs.watch(fileName, function () {
            connection.write('{type: \"changed\",\nfile: \"" + fileName + "\",\nsheker: \"kol')
            let timer = setTimeout(function(){
                connection.write('shehoo\", \ntimestamp: \"" + Date.now()+ "\"\n}');
     }, 2000);
       }*/

    let watcher;
    watcher = fs.watch(
        fileName, function () {
            let json1 = "{\"type\": \"changed\",\"file\": \"" + fileName + "\",\"sheker\": \"kols",
                json2 = "hehoo\", \"timestamp\": " + Date.now() + "}\n";


//            console.log('JSON : \n' + jsonnn);

            connection.write (json1);
            let timer = setTimeout(function(){
                connection.write (json2);
            }, 1000);
        }
    );

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

