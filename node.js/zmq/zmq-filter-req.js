//'use strict';
const
  
    zmq = require("zmq"),
    t = require('./talk.js'),
    filename = process.argv[2],
    
    requester = zmq.socket ('req');
    
    
    
    requester.on('message',function (data) {
        var response = JSON.parse(data);
        console.log ("received response : " , response);
    });
    
    
    requester.connect("tcp://"+ process.env.IP + ":"+ process.env.PORT);

    t.talk ("sending request for " + filename );
      for(var i = 0 ; i<=12 ; i++){
          requester.send(
            JSON.stringify({
                path: filename
            })
        ); 
      }  
       