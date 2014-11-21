fs=require('fs')
if (!process.argv[2]){
stream = fs.createReadStream("wrong file name");
}
else{
    stream = fs.createReadStream(process.argv[2]);

}


stream.on ('error' , function (err){
    process.stderr.write(" ####################### Error : "+ err.message);
});
stream.on ('data' , function (wordz){
    process.stdout.write(wordz);
});
