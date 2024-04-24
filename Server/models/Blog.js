const mongoose = require ('mongoose')

const BlogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
})