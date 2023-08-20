const express = require("express");
const router = express.Router();
const AskMeController=require('./askme.controller')
const checkToolEnabled=require("../../middlewares/checkToolEnabled")
const loggerMiddleware=require("../../middlewares/loggerMiddleware")


router.post("/generateAIpoweredResult",loggerMiddleware,checkToolEnabled,AskMeController.generateAIpoweredResult);

module.exports = router;