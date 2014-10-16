const fs = require ('fs');

fs.watch('target.txt' , function (){
    console.log ("file taget pwned");
});
console.log ('hello node' );