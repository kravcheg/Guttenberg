//'use strict';
const
    fs = require("fs"),
    zmq = require("zmq"),
    cluster = require("cluster");
  
    var slaves = 0;
    

if (cluster.isMaster){
   

        var
        pusher = zmq.socket('push').bind('ipc://push-socket.ipc'),
        puller = zmq.socket('pull').bind('ipc://pull-socket.ipc');
        
        
        for (var i = 0 ; i< 3 ; i++ ){
           cluster.fork();
        }

        puller.on ('message' , function (data){
            var message = JSON.parse(data);
                    var  date = new Date ();
                    
                    if (message.type === 'ready' ){
                        
                        slaves ++ ; //assuming only existing slave can send a redy status
                        console.log("slave " + message.pid +" is  " +  message.type + " and connected to master  at " + date);
                         
                          if (slaves === 3 ){
                                            
                                for (var i = 0 ; i< 30 ; i++ ){
                                              console.log("master " + process.pid + "  sending job at " + Date.now());
                                              pusher.send(JSON.stringify(
                                                {
                                                    type: "blow",
                                                    pid: process.pid
                                                }
                                              ));
                                } 
                          }

                         

                    } else if (message.type === 'blow' ){
                        
                        console.log("result " + message.result + "  at " + date );
  
                    }
             }
             
        );
        
        

       
             
        

     
}   else {
    
    
          puller = zmq.socket('pull').connect('ipc://push-socket.ipc'),
          pusher = zmq.socket('push').connect('ipc://pull-socket.ipc');
          
          pusher.send(JSON.stringify(
                    {
                        type: "ready",
                        result: "slave is ready",
                        pid: process.pid
                    }
                  ));
            console.log("i am a new slave  " + process.pid + " at " + Date.now());
          
          puller.on ('message' , function(data) {
              var job =JSON.parse(data.toString());
              console.log( process.pid + " doing " + job.type + " job at " + Date.now());
              
              pusher.send(JSON.stringify(
                    {
                        type: job.type,
                        result: "ok",
                        pid: process.pid
                    }
                  ));
          });
    
}    
       
process.on('SIGINT' , function (){
     var who = 'xolop'; 
        if (cluster.isMaster) who = 'boss';
        console.log ("\n" + who + "   " +  process.pid +'  dead');
        puller.close();
        pusher.close();
    });    

       