const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
    vigency: S
})

module.exports = mongoose.model('students',studentSchema)