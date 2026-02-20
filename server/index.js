const http=require('http');

// const myServer=http.createServer((req,res)=>{
// console.log(req);
// res.end("Hello from server!"); //end the response and send data to client
// });
// myServer.listen(8000,()=>{console.log("Server started!");})

const fs=require('fs');
const myServer=http.createServer((req,res)=>{
    const log = `${new Date().toLocaleString()} ${req.url}\n`;
    fs.appendFile('log.txt',log + "\n",(err,data)=>{
        if(err){
            console.log(err);
        } })
        switch(req.url){
            case "/":
                res.end("Welcome to Home Page!");
                break;
                case "/about":
                    res.end("I'm anshu gaur(about page!");
                    break;
                    default:
                        res.end("404 Not Found!");
        }
   
   // res.end("Hello from server again!"); //end the response and send data to client
})
myServer.listen(3000,()=>{console.log("Server started yayy!");})