const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    longUrl:{
        type:String,
        required:true
    },
    visitHistory:[
        {
            timestamp:{
                type:Date,
                default:Date.now 
            }
}]
});

const url=mongoose.model("Url",urlSchema);

module.exports=url;
