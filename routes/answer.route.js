const express = require("express");
const router = express.Router();
const AnswerController=require("../controllers/answer.controller")
const loggerMiddleware=require("../middlewares/loggerMiddleware")

router.post('/createAnswer',loggerMiddleware,AnswerController.createAnswer);
router.get('/getAnswerByAnswerId',loggerMiddleware,AnswerController.getAnswerByAnswerId);
router.get('/getAnswersByQuestionId',loggerMiddleware,AnswerController.getAnswersByQuestionId);

module.exports = router;