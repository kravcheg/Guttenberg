'use strict';
const
    express = require('express'),
    app = express();


    app.use(express.logger('dev'));


    app.get('/api/:name', function(req, res) {
        res.json(200, { "hello": req.params.name });
    });
    app.listen(3000, function(){
        console.log("express ready captain.");
});/**
 * Created by I048692 on 11/21/14.
 */
