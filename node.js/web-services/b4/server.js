'use strict';
const
    express = require('express'),
    morgan = require('morgan'),
   // logger = morgan('combined'),
    app = express();


   /// app.use(express.logger('dev'));

    app.use(morgan('combined'));
    app.get('/api/:name', function(req, res) {
        //res.json(200, { "hello": req.params.name });
        res.status(200).json({ "preved": req.params.name });
    });
    app.listen(3000, function(){
        console.log("express ready captain.");
});/**
 * Created by I048692 on 11/21/14.
 */
