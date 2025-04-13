const mongoose=require("mongoose")
const otpTemplate = require("../Template/emailVerificationTemplate")
const { MailSender } = require("../utils/MailSender")
const otpSchema=new mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
           type:Date,
           default:Date.now
    }
})

const SendOtp=async(otp,email)=>{
    try {
        await MailSender(email,"Email verification mail",otpTemplate(otp))    
    } catch (error) {
        console.log(error.message);
    }
    
}

otpSchema.pre("save",async function (next) {
    await SendOtp(this.otp,this.email)
    next();
})

otpSchema.index({createdAt:1},{expireAfterSeconds:5*60})

module.exports=mongoose.model("OTP",otpSchema)