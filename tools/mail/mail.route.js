const express = require("express");
const router = express.Router();
const MailController=require('./mail.controller')
const checkToolEnabled=require("../../middlewares/checkToolEnabled")
const loggerMiddleware=require("../../middlewares/loggerMiddleware")

router.post("/sendReceipt",loggerMiddleware,checkToolEnabled,MailController.sendReceipt);

module.exports = router;