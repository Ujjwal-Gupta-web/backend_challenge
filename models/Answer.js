const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    answer_value:String
});


module.exports = mongoose.model('Answers', Answer); 