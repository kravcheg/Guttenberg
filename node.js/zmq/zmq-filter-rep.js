//'use strict';
const
    fs = require("fs"),
    zmq = require("zmq"),
    cluster = require("cluster");
   
     if (cluster.isMaster){
        var
         router = zmq.socket('router').bind("tcp://"+ process.env.IP + ":"+ process.env.PORT ),
         dealer = zmq.socket('dealer').bind('ipc://magic-socket.ipc' );
         
        router.on ('message' , function (){
            var frames = Array.prototype.slice.call(arguments);
            dealer.send(frames);
        });
        
        
        
        dealer.on ('message' , function (){
            var frames = Array.prototype.slice.call( arguments);
            router.send(frames);
        });
        
        cluster.on('online' , function (worker){
          console.log ('worker ' + worker.process.pid   +  'is online' );  
            
        });
        
        for (var i = 0 ; i< 4 ; i++ ){
            cluster.fork();
        }
        
     }else{
        var responder = zmq.socket('rep').connect('ipc://magic-socket.ipc');
        
        responder.on('message' , function (data) {
            var request = JSON.parse(data);
            console.log( 'worker process pid ' + process.pid   +  ' received request for '   + request.path );
            
             fs.readFile(request.path , function (err, content){
                console.log(process.pid + " sending response content");
                
                responder.send(
                    JSON.stringify({
                        content: content.toString(),
                        timestamp: Date.now(),
                        pid: process.pid
                 }));
        });
         
         
            
        });
       
         
     }
             
    
    process.on('SIGINT' , function (){
        
        console.log (process.pid +'  hutting xdown');
        responder.close();
    });