const User = require("../models/User")
const { MailSender } = require("../utils/MailSender")
const bcrypt = require("bcrypt")
exports.sendRestLink=async(req,res)=>{
    try {
        const{email}=req.body
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please provide email"
            })
        }
        const user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"This email is not register with up"
            })
        }
        const token=crypto.randomUUID()

        user.token=token
        user.createdAt=Date.now()+5*60*1000

        await user.save()
        
        const url=`${process.env.CLIENT_URL}/change-password/${token}`

        await MailSender(email,"Password reset link",url)

        return res.status(200).json({
            success:true,
            message:"Reset Link is send to your email"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"link not send",
            error:error.message
        })
    }
}
exports.resetPassword=async(req,res)=>{
    try {
        const{token,password}=req.body
        if(!token || !password){
            return res.status(400).json({
                success:false,
                message:"please provide token"
            })
        }
        const user = await User.findOne({token:token})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Token not found"
            })
        }

        if(user.createdAt<Date.now())
        {
            return res.status(400).json({
                success:false,
                message:"link is invalid please generate another link"
            })
        }

        const securePassword = await bcrypt.hash(password,10)

        await User.findByIdAndUpdate(user._id,{password:securePassword})

        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"password not changed",
            error:error.message
        })
    }
}