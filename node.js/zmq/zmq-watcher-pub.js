//'use strict'
const 
    fs= require ('fs'),
    zmq = require('zmq'),
    publisher = zmq.socket ('pub'),
    filename = process.argv[2];
var    
    cnt = 0;
    
    
    fs.watch(filename , function(){
        if (cnt === 0)
            {
                publisher.send(
                     JSON.stringify(
                            {
                                type: 'we are back',
                                file: filename,
                                timestamp: Date.now(),
                                version: cnt
                            }
                        )
                   )
                   
            };
  
        cnt++;
        
        publisher.send(
            JSON.stringify(
                    {
                        type: 'changed',
                        file: filename,
                        timestamp: Date.now(),
                        version: cnt
                    }
                )
            )
    });
    
    publisher.bind ('tcp://*:7654' , function(err){
        console.log('listening for subscribers on tcp://*:7654, monitoring ' + filename + '\n\n');
    });
    
        