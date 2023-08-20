const express = require("express");
const router = express.Router();
const QuestionController=require('../controllers/question.controller')
const loggerMiddleware=require("../middlewares/loggerMiddleware")

router.post('/createQuestion',loggerMiddleware,QuestionController.createQuestion);
router.get('/getQuestionByQuestionId',loggerMiddleware,QuestionController.getQuestionByQuestionId);

module.exports = router;