const asyncHandler = require("express-async-handler");
const axios=require('axios')
const Form = require("../models/Form")
const baseurl=require("../baseURL")

const FormController = {
    createForm: asyncHandler(
        async (req, res) => {
            const {form_title, questions_arr } = req.body;
            let ques_id_arr = [];
            for (let question_title of questions_arr) {
                let result = await axios.post(`${baseurl}/api/question/createQuestion`,{
                    question_title
                  })
                if (result?.data) {
                    ques_id_arr.push(result.data.data._id);
                }
                else return res.json({
                    "data": {
                        "error": "Some error occured"
                    }, "tag": false
                })
            }
            const newForm = new Form({
                form_title,
                questions: ques_id_arr,
            })
            console.log(newForm);
            await newForm.save().then(() => {
                return res.json({ "data": newForm, "tag": true })
            }).catch(error => {
                return res.json({
                    "data": {
                        "error": error
                    }, "tag": false
                })
            })
        }
    ),
    getFormByFormId: asyncHandler(
        async (req, res) => {
            const { formId } = req.query;
            let form = await Form.findOne({ _id: formId }).populate('questions').exec();
            if (form) {
                return res.json({ "tag": true, "data": form });
            }
            return res.json({
                "tag": false, data: {
                    "error": `Form id : ${formId} not found`
                }
            });
        }
    )
}

module.exports = FormController; 