import nodemailer from 'nodemailer'

class EmailController {
    static transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMPT_USERNAME, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });
    static sendContactEmail = (req, res) => {
        const { name, email, subject, msg } = req.body
        let htmlContent = ''
        htmlContent += '<h2>Contact us Query!</h2><br/>'
        htmlContent += '<p><b>' + name + ', Email: ' + email + ' </b> has following query</p>'
        htmlContent += '<br/><br/>'
        htmlContent += '<p>' + msg + '</p>';
        var mailOptions = {
            from: process.env.SMPT_USERNAME,
            to: process.env.SMPT_USERNAME,
            subject: subject,
            text: '',
            html: htmlContent
        };

        EmailController.transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                res.send({ msg: "Email error" })
            } else {
                res.send({ msg: "Email sent" })
            }
        });

    }
}

export default EmailController