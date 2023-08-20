const asyncHandler = require("express-async-handler");
const axios=require("axios");

const AskMeController = {
    generateAIpoweredResult: asyncHandler(async (req, res) => {
        const { message } = req.body;
        const prompt = { role: "user", content: message }
        const API_URL = process.env.API_URL;
        const API_KEY = process.env.API_KEY;
        try{
            const result = await axios.post(API_URL, {
                model: "gpt-3.5-turbo",
                messages: [prompt],
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                }
            })
            return res.json({ tag: true, data: result.data.choices[0].message });
        }
        catch(error){
            return res.json({ tag: false, data: error });
        }
        
        
        
    })
}
module.exports = AskMeController;




