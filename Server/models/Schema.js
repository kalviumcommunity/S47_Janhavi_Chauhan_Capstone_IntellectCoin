const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    projectLink: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String },  // Added this field for video URL
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
