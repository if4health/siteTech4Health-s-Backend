const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
    vigency : String,
    coordinator : String,
    members : String,
    scholars : Array,
    status : String
})

module.exports = mongoose.model('projects',projectSchema)