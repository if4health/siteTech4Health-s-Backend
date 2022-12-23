const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	name : {
        type : String,
        default : undefined,
        required : true
    },

	quote : {
        type : String,
        default : undefined,
        required : true
    },

	tipo : {
        type : String,
        default : undefined,
        required : true
    },

	curso : {
        type : String,
        default : undefined,
        required : true
    },
	
	email : String,
	lattes : String,
	linkedin : String,
	github : String, 
	status : String,
	mypic : String
})

module.exports = mongoose.model('students',studentSchema)