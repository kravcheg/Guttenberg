"use strict"
const
    events = require ('events'),
    util = require ('util'),


// client constructor
    LDJClient = function(stream) {
        events.EventEmitter.call(this);
        let self = this,
        buffer = '';

        stream.on('data', function (data){

            buffer += data;
           let left = buffer.split("{").length - 1,
                right = buffer.split("}").length - 1;


                //each time func swallows data appends it ot the buffer end , them removes and emits messages from the front to \n and moves front
                let boundary = buffer.indexOf('\n');
                while (-1 !== boundary) {
                    let input = buffer.substr(0, boundary);
                    self.emit('message', JSON.parse(input));

                    buffer = buffer.substr(boundary + 1);
                    boundary = buffer.indexOf('\n');
                    //if no \n at the end, data will remain in the buffer and nexxt func call will append next chunk
                }



        })
    };

util.inherits(LDJClient, events.EventEmitter);

//expose module methods

exports.LDJClient = LDJClient;
exports.connect = function(stream) {
    return new LDJClient(stream) ;
}


