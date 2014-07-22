var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    scenario : {
        type : String
    },
    weight : {
        type : Number
    },
    questions : [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Test',testSchema);
