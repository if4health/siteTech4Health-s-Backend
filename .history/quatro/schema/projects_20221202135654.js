const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
	tittle : String,
	description : String,
    vigency : String,
    coordinator : String,
    members : {
        type : String
    },
    scholars : Array,
    status : String
})

module.exports = mongoose.model('students',studentSchema)