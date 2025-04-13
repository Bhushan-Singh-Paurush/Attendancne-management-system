const nodeMailer=require("nodemailer")
require("dotenv").config()

exports.MailSender=async(email,title,body)=>{
    try {
        const transport=nodeMailer.createTransport({
            host:process.env.HOST,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await transport.sendMail({
            from:"Attendify 🙋🏻‍♂️",
            to:`${email}`,
            html:`${body}`,
            subject:`${title}`
        })    
    } catch (error) {
        console.log(error.message);
    }
    
}