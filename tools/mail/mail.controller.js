const asyncHandler = require("express-async-handler");
const axios = require('axios');
const Form_Tool = require("../../models/Form_Tool")
const send_email = require("../../utility/send_email")
const tool=require("../../enums/tools.enums")
const MailController = {
    sendReceipt: asyncHandler(async (req, res) => {
        const { response,questionId } = req.body;
        let to="";
        let message = `${response.form.form_title} FORM SUBMITTED SUCCESS\nHere are the details submitted\n`;
        for (let answer of response.answers) {
            if(questionId==answer.question._id){
                to=answer.answer_value;
            }
            message += `${answer.question.question_title} : ${answer.answer_value}\n`
        }
        message += `\n\nThanks`;
        await send_email(to, `${response.form.form_title} FORM SUBMITTED SUCCESS`, message).then(() => {
            return res.json({ tag: true, data: { message: "EMAIL SENT SUCCESS" } })
        }).catch((err) => {
            return res.json({ tag: false, data: { error: err } })
        })
    })
}
module.exports=MailController;
