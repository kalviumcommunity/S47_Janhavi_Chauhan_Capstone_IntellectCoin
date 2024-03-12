const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Schema = require('./Schema');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/janhavidb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const Registration = mongoose.model('Register', Schema);

app.post('/register', async (req, res) => {
  const registration = new Registration(req.body);
  try {
    const savedRegistration = await registration.save();
    res.send(savedRegistration);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({"data":registrations});
  } catch (err) {
    res.status(400).send(err);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
