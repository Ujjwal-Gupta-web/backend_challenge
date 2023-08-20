const express = require("express");
const router = express.Router();
const SheetController=require('./sheet.controller')
const checkToolEnabled=require("../../middlewares/checkToolEnabled")
const loggerMiddleware=require("../../middlewares/loggerMiddleware")

router.post("/download_excel",loggerMiddleware,checkToolEnabled,SheetController.download_excel);

module.exports = router;