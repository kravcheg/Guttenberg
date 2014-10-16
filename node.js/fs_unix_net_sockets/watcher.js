const fs = require ('fs');

fs.watch('bober' , function (){
    console.log ("file taget pwned");
});
console.log ('hello node' );