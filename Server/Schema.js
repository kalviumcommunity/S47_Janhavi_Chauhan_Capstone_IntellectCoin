const mongoose = require('mongoose');


const Schema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Category: String,
    About: String,
    linkedin: {
        type: String,
        trim: true 
    },
    github: {
        type: String,
        trim: true
    },
    languages: {
        type: [String], 
        default: []
    }
})

module.exports = Schema;

