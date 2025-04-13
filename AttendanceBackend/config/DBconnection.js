const mongoose = require("mongoose")
require("dotenv").config()
exports.dbconnection=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{console.log("connected to database properly");
    }).catch((error)=>{console.log(error.message);
    })
}