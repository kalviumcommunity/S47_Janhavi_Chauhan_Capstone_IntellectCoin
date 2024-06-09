const {registerCompany, getCompanyRegistrations, getCompanyRegistrationById, updateCompanyRegistration, deleteCompanyRegistration} = require('../controllers/CompanyController');
const express = require('express');
const router = express.Router();


router.post('/register', registerCompany);
router.get('/registrations', getCompanyRegistrations);
router.get('/registrations/:id', getCompanyRegistrationById);
router.put('/register/:id', updateCompanyRegistration);
router.delete('/register/:id', deleteCompanyRegistration);

module.exports = router;
