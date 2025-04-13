const cloudinary = require("cloudinary").v2
require("dotenv").config()

exports.Cloudinary=()=>{
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
        console.log("connect to cloudinary");
    } catch (error) {
        console.log(error.message);
    }
}