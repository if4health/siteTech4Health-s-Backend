const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
    vigency : String,
    coordinator
})

module.exports = mongoose.model('students',studentSchema)