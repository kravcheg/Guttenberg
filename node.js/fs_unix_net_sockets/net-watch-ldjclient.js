'use strict';
const
    net = require ('net'),
    ldj = require ('./ldj.js'),
    port = process.argv[2],
    netClient = net.connect({port: port}),
    ldjClient = ldj.connect(netClient);

    ldjClient.on('message', function (message){
        if (message.type === 'watching'){
            console.log("#LDJ client#: began watching : " +  message.file);
        }else if (message.type === 'changed'){
         let date = new Date (message.timestamp);
         console.log ("#LDJ client#: file " + message.file +  " changed at "  + date );

        }else {
            throw Error("#LDJ client#: unknown message type " +  message.type );
        }


});


