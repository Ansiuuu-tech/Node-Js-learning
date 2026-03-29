const fs = require("fs");

function requestLogger(filename) {
return((req,res,next)=>{
    fs.appendFile(filename,`${req.method} ${req.url}\n`,(err)=>{
        if(err){
            console.error("Failed to log request",err);
        }
    });
    next();
}   );
}
module.exports={requestLogger};