const CompanyRegistration = require('../models/CompanySchema');

exports.registerCompany = async (req, res) => {

  try {
    const{Name , Description, Requirements, LinkedIn, ContactUs, Twitter, Projects, ProjectDescription} = req.body;
    const savedCompanyRegistration = await CompanyRegistration.create({Name , Description, Requirements, LinkedIn, ContactUs, Twitter, Projects, ProjectDescription} );
    res.status(201).send(savedCompanyRegistration);
  } catch (err) {
    console.error('Company registration failed:', err);
    res.status(400).send({ error: 'Company registration failed', details: err.message });
  }
};

exports.getCompanyRegistrations = async (req, res) => {
  try {
    const companyregistrations = await CompanyRegistration.find();
    res.json({ data: companyregistrations });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCompanyRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const companyregistration = await CompanyRegistration.findById(id);
    if (!companyregistration) {
      return res.status(404).json({ error: "Company registration not found" });
    }
    res.json({ data: companyregistration });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateCompanyRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCompanyRegistration = await CompanyRegistration.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompanyRegistration) {
      return res.status(404).json({ error: "Company registration not found" });
    }
    res.send(updatedCompanyRegistration);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteCompanyRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCompanyRegistration = await CompanyRegistration.findByIdAndDelete(id);
    if (!deletedCompanyRegistration) {
      return res.status(404).json({ error: "Company registration not found" });
    }
    res.send("Company Registration deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};



