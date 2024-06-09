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
    },
    CollegeName: String,
    Degree: String,
    YearOfStudy: String,
    Skills: String,
    ProjectCode: {
        type: String, 
        trim: true 
    },
    DeployedLink: {
        type: String,
        trim: true
    },
    Certificates: {
        type:String
    },  
    PhoneNumber: {
        type: String,
        trim: true
    }

})

module.exports = mongoose.model('Registration', Schema)

