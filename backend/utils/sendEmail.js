const nodeMailer = require("nodemailer")


const sendEmail = async (options )=>{
    const transporter = nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
        /* zai mail thaka email pathabo tar mail id user a 
        assign korte hobe.sai email id er password ta k password
        property te assign korte hobe  */
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to: options.email ,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions );
    /* ai sendMail(mailOptions ) method ta email send korbe */
}


module.exports = sendEmail