const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/janhavidb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const Registration = mongoose.model('Register', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmation: String,
  phoneNumber: String,
  date: {
    type: Date,
    default: Date.now
  }
}));

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
    res.send(registrations);
  } catch (err) {
    res.status(400).send(err);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
