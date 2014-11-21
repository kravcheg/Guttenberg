'use strict';

const
net = require ('net'),
port = process.argv[2],
client = net.connect({port: port});

client.on('data', function (data){
    let message =   JSON.parse(data);
    if (message.type === 'watching'){
        console.log("#client#: began watching : " +  message.file);
    }else if (message.type === 'changed'){
     let date = new Date (message.timestamp);
     console.log ("#client#: file " + message.file +  " changed at "  + date );

    }else {

        throw Error("#client#: unknown message type " +  message.type );
    }


});


