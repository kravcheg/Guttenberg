#!/bin/sh
':' //; exec "$(command -v nodejs || command -v no^Z^Z^Z)" "$0" "$@"

const
    file = require ('file'),
    rdfParser = require ('./lib/rdf-parser.js');
console.log ('begin crawl directory') ;

var cnt = 1 ;
file.walk(__dirname + '../../cache', function (err, dirPath, dirs, files) {

    files.forEach(function (path) {
        rdfParser(path, function (err, doc) {
            if (!err) {
                console.log("file # " + cnt + "   \n\n" + doc);
                cnt++;
            } else {
                throw err;
            }

        });

    });

});