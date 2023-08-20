const asyncHandler = require("express-async-handler");
const Question = require("../models/Question")

const QuestionController = {
    createQuestion: asyncHandler(
        async (req, res) => {
            const { question_title } = req.body;
            const newQuestion = new Question({
                question_title
            })
            await newQuestion.save().then(() => {
                return res.json({ "data": newQuestion, "tag": true })
            }).catch(error => {
                return res.json({
                    "data": {
                        "error": error
                    }, "tag": false
                })
            })
        }
    ),
    getQuestionByQuestionId: asyncHandler(
        async (req, res) => {
            const { questionId } = req.query;
            let question = await Question.findOne({ _id: questionId });
            if (question) {
                return res.json({ "tag": true, "data": question });
            }
            return res.json({
                "tag": false, data: {
                    "error": `question id : ${questionId} not found`
                }
            });
        }
    )
}

module.exports = QuestionController; 