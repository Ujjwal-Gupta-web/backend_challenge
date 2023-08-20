const express = require("express");
const router = express.Router();
const ResponseController=require("../controllers/response.controller")
const loggerMiddleware=require("../middlewares/loggerMiddleware")

router.post('/submitResponse',loggerMiddleware,ResponseController.submitResponse);
router.get("/getResponsesByFormId",loggerMiddleware,ResponseController.getResponsesByFormId);
router.get("/getResponseByResponseId",loggerMiddleware,ResponseController.getResponseByResponseId);

module.exports = router;