const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Requirements: {
        type: String,
        required: true
    },
    LinkedIn: {
        type: String,
        trim: true 
    },
    ContactUs: {
        type: String,
        trim: true
    },
    Twitter: {
        type: String,
        trim: true
    },
    Projects: {
        type: String,
        
    },
    ProjectDescription: {
        type: String,
    
    }
});

module.exports = mongoose.model('Company', CompanySchema)
