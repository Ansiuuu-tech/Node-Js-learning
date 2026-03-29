const express = require("express");
const {connectToDatabase}=require("./connection");

const {requestLogger}=require("./middleware");

const userRouter= require("./routes/user");

const app = express();
const port = 8000;

//connection
connectToDatabase("mongodb://localhost:27017/youtube-app-1").then(()=>{
    console.log("Connected to MongoDB successfully");
})

//middleware
app.use(express.urlencoded({extended:false}));
app.use(requestLogger("log.txt"));





//routes
app.use("/api/users", userRouter);


app.listen(port, () => console.log(`Server started at port:${port}`));