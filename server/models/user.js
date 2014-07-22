var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : {
        type : String,
        email : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tests : [{ type: Schema.Types.ObjectId, ref: 'Test' }],
    totalScore : {
        type : Number
    },
    totalPossibleScore : {
      type : Number
    },
    IQ : {
        type : Number
    }
});

module.exports = mongoose.model('User',userSchema);