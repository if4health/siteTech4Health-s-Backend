const mongoose = require('mongoose')
const members = new mongoose.schema({})

const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
    vigency : String,
    coordinator : String,
    members : String
    scholars : Array,
    status : String
})

module.exports = mongoose.model('students',studentSchema)