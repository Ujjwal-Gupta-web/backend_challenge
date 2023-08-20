const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
   question_title:String
});


module.exports = mongoose.model('Questions', Question); 