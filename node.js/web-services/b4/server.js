#!/usr/bin/env node --harmony
'use strict';
const
    express = require('express'),
    logger = require ('morgan'),
    app = express();

const config = {
    bookdb: 'http://localhost:5984/books/',
    b4db: 'http://localhost:5984/b4/'
};


app.use(logger('dev'));
require('./lib/book-search.js')(config, app);
require('./lib/field-search.js')(config, app);
require('./lib/bundle.js')(config, app);

app.listen(3000, function(){
    console.log("ready captain.");
});