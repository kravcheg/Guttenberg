//"use strict";
const 
    zmq = require('zmq'),
    subscriber = zmq.socket('sub');
    subscriber.subscribe("");

   subscriber.on("message", function (data){
                    
                    var message = JSON.parse(data);
                    var  date = new Date (message.timestamp);
                    if (message.type === 'we are back'){
                        console.log( " " +  message.type + "  at " + date);
                    }else{
                        console.log("file " + message.file + " changed at " + date + "  version: " + message.version);
  
                    }
                   
               }
            );
    
    
   
    subscriber.connect ('tcp://localhost:7654' , function(){
        console.log('connected to tcp://localhost:7654');
        }
    );