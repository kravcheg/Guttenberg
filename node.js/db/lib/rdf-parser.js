'use strict';

const fs = require('fs'),
    cheerio = require('cheerio');

module.exports = function (filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            return callback(err);
        }

        var $ = cheerio.load(data.toString()),
            _map = function (items, mapper) {
                var rv = [];

                items.each(function (i, elem) {
                    rv.push(mapper(elem));
                });

                return rv;
            },
            collect = function (index, elem) {
                var rv = $(elem).text();
                return rv;
            },
            authors = $('pgterms\\:agent pgterms\\:name'),
            subjects = $('[rdf\\:resource$="/LCSH"]');
        var doc = {
            _id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
            title: $('dcterms\\:title').text(),
            authors: _map(authors, function (elem) {
                return $(elem).text();
            }),
            subjects: _map(subjects, function (elem) {
                return $(elem).find('rdf\\:value').text();
            })
        };

        if (doc._id === undefined)
            callback("something went wrong");
        else
            callback(null, doc);
    });
};
