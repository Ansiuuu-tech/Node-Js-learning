const fs=require('fs');

//Synchronous way to create/write file
// fs.writeFileSync('./test.txt',"Hey Anshul! Welcome to the world of JavaScript!");

//asynchronous way to write/create file
//fs.writeFile('./test.txt',"Hey Anshul!(Async) Welcome to the world of JavaScript!",(err)=>{})

//Synchronous way to read file
    // const content=fs.readFileSync('contacts.txt','utf8')
    // console.log(content)

    // fs.readFile('contacts.txt','utf8',(err,data)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(data);
    //     }
    // });


//Synchronous way to append data to file
fs.appendFileSync('./test.txt',"Hey Anshul! Welcome to the world of JavaScript!\n");
    fs.appendFileSync('./test.txt',new Date().toLocaleString() + "\n"); 


    //copy file
    fs.cpSync('./test.txt','./backup.txt');

//delete file
    //fs.unlinkSync('./backup.txt');

//check the stats of folder/file
   console.log(fs.statSync('./test.txt').isFile()); //true

//create directory
   //fs.mkdirSync("my-docs/a/b",{recursive:true}); 