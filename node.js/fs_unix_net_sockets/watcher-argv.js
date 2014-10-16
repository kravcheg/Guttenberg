
const fs = require ('fs');
filename = process.argv[2];
exec = require('child_process').exec;
command = process.argv[3] ;
if (filename) {
    fs.exists(filename, function (exists) {
        if (!exists) {

            fs.openSync(filename, 'w', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        } else {
            console.log("file " + filename + " found ");
        }

        fs.watch(filename, function () {
                exec(command, function (error, stdout, stderr) {
                console.log("file " + stdout + filename + " modified");
                if (error !== null) {
                    console.log('exec error: ' + error);
                    console.log('stderr: ' + stderr);
                }

            });
        });

    });
} else {
    throw Error("specify a file");
}





