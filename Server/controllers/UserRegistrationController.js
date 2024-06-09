const Registration = require('../models/Schema');

exports.register = async (req, res) => {
  // const registration = new Registration(req.body);
  try {
    // const registration = new Registration(req.body);
    const {FirstName, LastName, Email, Category, About, linkedin, github, languages, CollegeName, Degree, YearOfStudy, Skills,  ProjectCode, DeployedLink, Certificates, PhoneNumber} = req.body;
    const savedRegistration = await Registration.create({FirstName, LastName, Email, Category, About, linkedin, github, languages, CollegeName, Degree, YearOfStudy, Skills, ProjectCode, DeployedLink, Certificates, PhoneNumber} );
    res.send(savedRegistration);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({ data: registrations });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.json({ data: registration });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRegistration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.send(updatedRegistration);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(id);
    if (!deletedRegistration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.send("Registration deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};
