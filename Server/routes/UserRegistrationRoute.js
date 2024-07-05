const express = require('express');
const router = express.Router();
const { getUserProjects, createProject, getAllProjects, deleteProject, updateProject } = require('../controllers/UserRegistrationController');

router.get('/user-projects', getUserProjects);

router.post('/create', createProject);

router.get('/allprojects', getAllProjects);

router.delete('/delete/:id', deleteProject);

router.put('/update/:id', updateProject);

module.exports = router;
