const nodemailer=require('nodemailer')
async function send_email(to, subject, message) {
    let sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.myEmail,
            pass: process.env.myPass
        }
    });


    let details = {
        from: process.env.myEmail,
        to: to,
        subject: subject,
        text: message
    };

    console.log(details)
    sender.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("sent");
        }
    })
}

module.exports=send_email;