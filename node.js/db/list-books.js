'use strict';

const
    file = require ('file'),
    rdfParser = require ('./lib/rdf-parser.js');
console.log ('begin crawl directory  '+ __dirname ) ;

var cnt = 1 ;
file.walk('../../cache', function (err, dirPath, dirs, files) {

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
