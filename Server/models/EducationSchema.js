const mongoose = require('mongoose');


const EducationSchema = mongoose.Schema({
    CollegeName: String,
    Degree: String,
    YearOfStudy: String,
    Skills: String,
    About: String,
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
    }
})

module.exports = EducationSchema;

