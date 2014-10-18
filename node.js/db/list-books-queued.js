#!/bin/sh
':' //; exec "$(command -v nodejs || command -v no^Z^Z^Z)" "$0" "$@"

const
    file = require ('file'),
    async = require ('async'),
    rdfParser = require ('./lib/rdf-parser.js');
work = async.queue (
    function (path , done) {
        rdfParser (path , function (err , doc){
            console.log (doc);
            done();
        });
    }, 1000 );

console.log ('begin crawl directory') ;

file.walk('../../cache', function (err, dirPath, dirs, files) {

    files.forEach(function (path) {

            work.push (path);
     });

});