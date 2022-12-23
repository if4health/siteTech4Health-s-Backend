const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
    vigency : String,
    coordinator : String,
    members : Array,
    scholars : Array,
    status : 
})

module.exports = mongoose.model('students',studentSchema)