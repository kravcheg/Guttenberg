//'use strict';
const
    fs = require("fs"),
    zmq = require("zmq"),
    talk = function (what){
                console.log(what);
             },
    responder = zmq.socket('rep');
    
    responder.on ('message' , function (data){
        var
            request = JSON.parse(data);
            talk("request to get " + request.path + " received ! ");
            
            fs.readFile(request.path , function (err, content){
                talk("sending response content");
                
                responder.send(
                    JSON.stringify({
                        content: content.toString(),
                        timestamp: Date.now(),
                        pid: process.pid
                 }));
        });
           
    })
    
    responder.bind ("tcp://"+ process.env.IP + ":"+ process.env.PORT , function (err){
        talk(" listening on tcp://" + process.env.IP + ":"+ process.env.PORT );
    });
    
    
    process.on('SIGINT' , function (){
        
        talk ('shutting xdown');
        responder.close();
    });