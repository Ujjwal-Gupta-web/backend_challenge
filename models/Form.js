const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const Form = new Schema({
    form_title:String,
    questions:[{
        type: Schema.Types.ObjectId,
        ref: 'Questions'
   }]
});

module.exports = mongoose.model('Forms', Form); 