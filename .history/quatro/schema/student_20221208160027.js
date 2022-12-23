const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	name : String,
	quote : String,
	titulo : String,
	tipo : String,
	curso : String,
	email : String,
	lattes : String,
	linkedin : String,
	github : String, 
	status : String,
	mypic : String
})

module.exports = mongoose.model('students',studentSchema)