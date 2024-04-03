const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Schema = require("./models/Schema");
const CompanySchema = require("./models/CompanySchema");
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
const CompanyRegistration = mongoose.model("CompanyRegister", CompanySchema);

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

app.post("/companyregister", async (req, res) => {
  const companyregistration = new CompanyRegistration(req.body);
  try {
    const savedCompanyRegistration = await companyregistration.save();
    res.status(201).send(savedCompanyRegistration); 
  } catch (err) {
    console.error('Company registration failed:', err);
    res.status(400).send({ error: 'Company registration failed', details: err.message });
  }
});


app.get("/companyregistrations", async (req, res) => {
  try {
    const companyregistrations = await CompanyRegistration.find();
    res.json({ data: companyregistrations });
  } catch (err) {
    res.status(400).send(err);
  }
})

app.get ("/companyregistrations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const companyregistrations = await CompanyRegistration.findById(id);
    res.json({ data: companyregistrations });
  } catch (err) {
    res.status(400).send(err);
  }
})

app.put("/companyregister/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCompanyRegistration = await CompanyRegistration.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedCompanyRegistration);
  } catch (err) {
    res.status(400).send(err);
  }
})

app.delete("/companyregister/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CompanyRegistration.findByIdAndDelete(id);
    res.send("Company Registration deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
