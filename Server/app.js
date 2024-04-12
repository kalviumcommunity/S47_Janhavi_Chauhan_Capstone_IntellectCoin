
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Schema = require("./models/Schema");
const CompanySchema = require("./models/CompanySchema");
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
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

// Middleware to log responses
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    console.log('Response from server:', data);
    oldSend.apply(res, arguments);
  };
  next();
});

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
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.json({ data: registration });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put("/register/:id", async (req, res) => {
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
});

app.delete("/register/:id", async (req, res) => {
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
});

app.get ("/companyregistrations/:id", async (req, res) => {
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
});

app.put("/companyregister/:id", async (req, res) => {
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
});

app.delete("/companyregister/:id", async (req, res) => {
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
});


// Get user by ID
app.get('/personalprofile/:id', async (req, res) => {
  try {
    const user = await user.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Only send relevant user data (you may customize this)
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // Add more fields as needed
    };
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
