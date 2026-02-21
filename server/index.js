const http=require('http');

// const myServer=http.createServer((req,res)=>{
// console.log(req);
// res.end("Hello from server!"); //end the response and send data to client
// });
// myServer.listen(8000,()=>{console.log("Server started!");})

const fs=require('fs');
const url=require('url');

const myServer=http.createServer((req,res)=>{
    if(req.url=="/favicon.ico"){
       return res.end();
     
    }
    const log = `${new Date().toLocaleString()} ${req.url}\n`;
    const myurl=url.parse(req.url);
    console.log(myurl);
    fs.appendFile('log.txt',log + "\n",(err,data)=>{
        if(err){
            console.log(err);
        } })
        switch(myurl.pathname){
            case "/":
                res.end("Welcome to Home Page!");
                break;
                case "/about":
                    const username=myurl.querymyname;
                    res.end("I'm anshu gaur(about page!");
                    break;
                    case "/contact":
                        res.end("Contact me at: anshugaur@example.com");
                    default:
                        res.end("404 Not Found!");
        }
   
   // res.end("Hello from server again!"); //end the response and send data to client
})
myServer.listen(3000,()=>{console.log("Server started yayy!");})