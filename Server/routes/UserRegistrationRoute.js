const {register , getRegistrations, getRegistrationById, updateRegistration, deleteRegistration} = require('../controllers/UserRegistrationController');
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.get('/registrations',getRegistrations);
router.get('/registrations/:id', getRegistrationById);
router.put('/register/:id', updateRegistration);
router.delete('/register/:id',deleteRegistration);

module.exports = router;
