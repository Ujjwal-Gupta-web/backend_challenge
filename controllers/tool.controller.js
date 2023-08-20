const asyncHandler = require("express-async-handler");
const Form_Tool = require('../models/Form_Tool')
const Tool = require('../models/Tool')

const ToolController = {
    createTool:asyncHandler(async(req,res)=>{
        const {tool_title}=req.body;
        const newTool=new Tool({tool_title});
        console.log(newTool)
        await newTool.save().then(() => {
            return res.json({ "data": newTool, "tag": true })
        }).catch(error => {
            return res.json({
                "data": {
                    "error": error
                }, "tag": false
            })
        })
    }),
    toggleTool: asyncHandler(async (req, res) => {
        const { formId, toolId,questionId } = req.body;
        const doc = await Form_Tool.findOne({ form: formId, tool: toolId });
        if (doc) {
            doc.isPluggedIn = !doc.isPluggedIn;
            await doc.save().then(() => {
                return res.json({ "data": doc, "tag": true })
            }).catch(error => {
                return res.json({
                    "data": {
                        "error": error
                    }, "tag": false
                })
            })
        }

        const newFormTool = new Form_Tool({
            form: formId,
            tool: toolId,
            isPluggedIn: true,
            question:questionId
        })
        await newFormTool.save().then(() => {
            return res.json({ "data": newFormTool, "tag": true })
        }).catch(error => {
            return res.json({
                "data": {
                    "error": error
                }, "tag": false
            })
        })


    })
}

module.exports = ToolController