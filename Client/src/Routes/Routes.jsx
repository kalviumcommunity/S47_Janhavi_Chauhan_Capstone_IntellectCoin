import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import LandingPage from '../components/LandingPage';
import Home from '../components/Home';
import RegistrationAndEducationForm from '../components/Profile';
import Findjob from '../pages/Findjob';
import Events from '../pages/Events';
import Features from '../pages/Features';
import Contact from '../pages/Contact';
import Whyus from '../pages/Whyus';
import Aboutus from '../pages/AboutUs';
import UpdateUser from '../components/UpdateUser';
import Login from '../components/Login';
import Signup from '../components/Signup';
import CompanyRegistration from '../components/CompanyProfile';
import DataDisplayPage from '../components/Datadisplay';
import CompanyList from '../components/DisplayCompanyData';
import PersonalProfile from '../components/PersonalProfile';
import ProtectedRoute from '../ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectors } from '../authSlice';
import BloggingForm from '../components/BloggingForm';
import BlogDisplay from '../components/BlogDisplay';

function Rout() {
  const isAuthenticated = useSelector(selectors);
  console.log('routes isAuthenticated:--',isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<RegistrationAndEducationForm />} />
        <Route path="/home" element={<ProtectedRoute isAuthenticated = {isAuthenticated} component={Home} > </ProtectedRoute>} />
        <Route path="/findjob" element={<ProtectedRoute isAuthenticated = {isAuthenticated} component={Findjob} > </ProtectedRoute>} />
        <Route path="/events" element={<Events />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/whyus" element={<Whyus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/companyregister" element={<CompanyRegistration />} />
        <Route path="/userprofiledata" element={<DataDisplayPage />} />
        <Route path="/companylist" element={<CompanyList />} />
        <Route path="/personalprofile/:id" element={<PersonalProfile />} />
        <Route path="/bloggingform" element={<BloggingForm />} />
        <Route path="/blogdisplay" element={<BlogDisplay />} />

      </Routes>
    </Router>
  );
}

export default Rout;
