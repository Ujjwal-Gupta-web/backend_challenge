const asyncHandler = require("express-async-handler");
const Response = require("../models/Response");
const baseurl = require("../baseURL");
const axios=require("axios")

const ResponseController = {
    submitResponse: asyncHandler(
        async (req, res) => {
            const { formId, response_arr } = req.body;
            let ans_id_arr = [];
            for (let resp of response_arr) {
                // create answer
                let result = await axios.post(`${baseurl}/api/answer/createAnswer`, {
                    question: resp.questionId,
                    answer_value:resp.answer_value
                })
                if (result?.data) {
                    ans_id_arr.push(result.data.data._id);
                }
                else return res.json({
                    "data": {
                        "error": "Some error occured"
                    }, "tag": false
                })
            }
            const newResponse = new Response({
                form: formId,
                answers: ans_id_arr,
            })
            console.log(newResponse);
            await newResponse.save().then(() => {
                return res.json({ "data": newResponse, "tag": true })
            }).catch(error => {
                return res.json({
                    "data": {
                        "error": error
                    }, "tag": false
                })
            })
        }
    ),

    getResponsesByFormId: async (req, res) => {
        const { formId } = req.query;
        let responses = await Response.find({ form: formId }).populate({ 
            path: 'answers',
            populate: {
              path: 'question',
              model: 'Questions'
            } 
         }).populate("form").exec();
        if (responses?.length) {
            return res.json({ "tag": true, "data": responses });
        }
        return res.json({
            "tag": false, data: {
                "error": `Responses for Form id : ${formId} not found`
            }
        });
    },

    getResponseByResponseId: asyncHandler(
        async (req, res) => {
            const { responseId } = req.query;
            
            let response = await Response.findOne({ _id: responseId }).populate({ 
                path: 'answers',
                populate: {
                  path: 'question',
                  model: 'Questions'
                } 
             }).populate('form').exec();
            if (response) {
                return res.json({ "tag": true, "data": response });
            }
            return res.json({
                "tag": false, data: {
                    "error": `Response id : ${responseId} not found`
                }
            });
        }
    )
}

module.exports = ResponseController; 