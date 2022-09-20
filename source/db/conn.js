const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tera_com").then(() => {
    console.log("sucessfully connected to database")
}).catch((err) => {
    console.log("not connected To DB this is an error")
})


