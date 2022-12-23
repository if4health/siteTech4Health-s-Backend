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

	email : {
        type : String,
        default : undefined,
        required : true
    },

	lattes : {
        type : String,
        default : undefined,
        required : true
    },

	linkedin : {
        type : String,
        default : undefined,
        required : true
    },

	github : {
        type : String,
        default : undefined,
        required : true
    },

	status :{
        type : String,
        default : undefined,
        required : true
    },
	
	mypic : String
})

module.exports = mongoose.model('students',studentSchema)