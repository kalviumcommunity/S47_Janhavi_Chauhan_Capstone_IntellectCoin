const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Schema = require("./models/Schema");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Capstone', 
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};

connectDB();

const Registration = mongoose.model("Register", Schema);

app.post("/register", async (req, res) => {
  const registration = new Registration(req.body);
  try {
    const savedRegistration = await registration.save();
    res.send(savedRegistration);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({ data: registrations });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/registrations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const registrations = await Registration.findById(id);
    res.json({ data: registrations });
  } catch (err) {
    res.status(400).send(err);
  }
});


app.put("/register/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedRegistration);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.delete("/register/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Registration.findByIdAndDelete(id);
    res.send("Registration deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
