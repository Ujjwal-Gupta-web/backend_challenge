const Form_Tool=require("../models/Form_Tool")

const checkToolEnabled=async(req,res,next)=>{
    const {formId,toolId}=req.body;
    try{
        let result=await Form_Tool.findOne({form:formId,tool:toolId})
        console.log(result)
        if(result && result.isPluggedIn){
            next()
        }
        else{
            return res.status(401).json({"tag":false,data:{
                message:"Tool not plugged in"
            }})
        }
    }
    catch(e){
        console.log(e)
        return res.status(401).json({tag:false,data:{
            error:e
        }})
    }
}

module.exports=checkToolEnabled;