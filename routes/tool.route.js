const express = require("express");
const router = express.Router();
const ToolController=require("../controllers/tool.controller")
const loggerMiddleware=require("../middlewares/loggerMiddleware")

router.post('/createTool',loggerMiddleware,ToolController.createTool);
router.put('/toggleTool',loggerMiddleware,ToolController.toggleTool);

module.exports = router;