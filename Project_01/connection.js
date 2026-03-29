const mongoose = require("mongoose");

//connect to database
async function connectToDatabase(url) {

return mongoose.connect(url)
}
module.exports={connectToDatabase};

// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.error("Failed to connect to MongoDB", err));