const asyncHandler = require("express-async-handler");
const Answer = require("../models/Answer");
const baseurl = require("../baseURL");

const AnswerController = {
    createAnswer:  async (req, res) => {
        const { question, answer_value } = req.body;
        const newAnswer = new Answer({
            question, answer_value 
        })
        await newAnswer.save().then(() => {
            return res.json({ "data": newAnswer, "tag": true })
        }).catch(error => {
            return res.json({
                "data": {
                    "error": error
                }, "tag": false
            })
        })
    },
    getAnswerByAnswerId: asyncHandler(
        async (req, res) => {
            const { answerId } = req.query;
            let answer = await Answer.findOne({ _id: answerId });
            if (answer) {
                return res.json({ "tag": true, "data": answer });
            }
            return res.json({
                "tag": false, data: {
                    "error": `answer id : ${answerId} not found`
                }
            });
        }
    ),
    getAnswersByQuestionId: asyncHandler(
        async (req, res) => {
            const { questionId } = req.query;
            let answers = await Answer.find({ question: questionId });
            if (answers?.length) {
                return res.json({ "tag": true, "data": answers });
            }
            return res.json({
                "tag": false, data: {
                    "error": `Answers for question id : ${questionId} not found`
                }
            });
        }
    )
   
}

module.exports = AnswerController; 