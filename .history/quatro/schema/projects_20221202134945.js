const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
})

module.exports = mongoose.model('students',studentSchema)