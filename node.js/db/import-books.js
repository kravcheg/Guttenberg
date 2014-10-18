#!/bin/sh
':' //; exec "$(command -v nodejs || command -v no^Z^Z^Z)" "$0" "$@"

const
    file = require ('file'),
    async = require ('async'),
    request = require ('request'),
    rdfParser = require ('./lib/rdf-parser.js');
work = async.queue (
    function (path , done) {
        rdfParser(path, function(err, doc) {
            request({
                method: 'PUT',
                url: 'http://localhost:5984/books/' + doc._id,
                json: doc
            }, function(err, res, body) {
                if (err) {
                    throw Error(err);
                }
                console.log(res.statusCode, body);
                done();
            });
        });
    }, 10 );

console.log ('begin crawl directory') ;

file.walk('../../cache', function (err, dirPath, dirs, files) {

    files.forEach(function (path) {

            work.push (path);
     });

});