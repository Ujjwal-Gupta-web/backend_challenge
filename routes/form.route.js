const express = require("express");
const router = express.Router();
const FormController=require('../controllers/form.controller')
const loggerMiddleware=require("../middlewares/loggerMiddleware")

router.post("/createForm",loggerMiddleware,FormController.createForm);
router.get("/getFormByFormId",loggerMiddleware,FormController.getFormByFormId)

module.exports = router;