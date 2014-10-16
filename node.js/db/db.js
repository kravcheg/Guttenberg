var sql = require('mssql'); 

var config = {
    user: 'kravchik',
    password: '',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'c',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

var connection = new sql.Connection(config, function(err) {
    // ... error checks

    // Query

    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('select 1 as 1', function(err, recordset) {
        // ... error checks

        console.log(recordset);
    });

    // Stored Procedure

    request = new sql.Request(connection);
    request.input('input_parameter', sql.Int, 10);
    request.output('output_parameter', sql.VarChar(50));
    request.execute('procedure_name', function(err, recordsets, returnValue) {
        // ... error checks

        console.log(recordsets);
    });

});