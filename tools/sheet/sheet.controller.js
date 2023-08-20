const asyncHandler = require("express-async-handler");
const axios=require("axios")
const baseurl=require("../../baseURL")
const ExcelJS = require('exceljs');
const fs = require('fs');

const SheetController = {
    download_excel: asyncHandler(async (req, res) => {
        const {formId}=req.body;
        const responses=await axios.get(`${baseurl}/api/response/getResponsesByFormId?formId=${formId}`)
        let jsonData = [
        ];
        let rowInfo=[];
        if(responses.data.data.length===0) return res.json({tag:false,data:{message:"No record found"}})
        let fileName=responses.data.data[0].form.form_title+"_"+formId;

        for(let response of responses.data.data){
            let obj={};
            for(let answer of response.answers){
                if(rowInfo.length!=answer.length){
                    rowInfo.push(answer.question.question_title);
                }
                obj[answer.question.question_title]=answer.answer_value
            }
            jsonData.push(obj);
        }
        const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Define the header row
    worksheet.addRow(rowInfo);

    // Add data rows from JSON
    jsonData.forEach((row) => {
        worksheet.addRow([row.Name, row.Age, row.City]);
    });

    // Define the path for the output Excel file
    const excelFilePath = `${fileName}.xlsx`;
    // Write the workbook to a file
    workbook.xlsx.writeFile(excelFilePath)
        .then(() => {
            return res.download(excelFilePath)
        })
        .catch((error) => {
            return res.json({tag:false,error:error})
        });
        
    })
}

module.exports = SheetController;

