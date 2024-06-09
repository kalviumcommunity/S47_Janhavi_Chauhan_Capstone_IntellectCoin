const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./config/db');
const userRegistrationRoutes = require('./routes/UserRegistrationRoute');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogRoutes');
const companyRoutes = require('./routes/CompanyRegistrationRoute');
const logResponses = require('./middleware/LogResponse');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 4000;

app.use('/api/users', userRegistrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/companies', companyRoutes);

app.use(logResponses);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
