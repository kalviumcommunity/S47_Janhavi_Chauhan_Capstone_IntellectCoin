import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/LandingPageComponent/Navbar';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import CreateProject from '../components/UserRegistrationComponent/UserRegistration';
import Findjob from '../components/LandingPageComponent/Findjob';
import Events from '../components/LandingPageComponent/Events';
import Features from '../components/LandingPageComponent/Features';
import Contact from '../components/LandingPageComponent/Contact';
import Whyus from '../components/LandingPageComponent/Whyus';
import Aboutus from '../components/LandingPageComponent/AboutUs';
import UpdateUser from '../components/UserRegistrationComponent/UpdateUser';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import CompanyRegistration from '../components/CompanyComponent/CompanyProfile';
import DataDisplayPage from '../components/UserRegistrationComponent/Datadisplay';
import CompanyList from '../components/CompanyComponent/DisplayCompanyData';
import PersonalProfile from '../components/PersonalProfile';
import BloggingForm from '../components/BloggingComponent/BloggingForm';
import BlogDisplay from '../components/BloggingComponent/BlogDisplay';
import ProtectedRoute from '../redux/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectors } from '../redux/authSlice';
import CompleteProfile from '../components/Authentication/completeProfile';
import { AuthProvider } from '../components/Authentication/AuthContext';
import UserProfileProjects from '../components/UserRegistrationComponent/UserProjectDisplay';
import UpdateProject from '../components/UserRegistrationComponent/UpdateProject';


function Rout() {
  const isAuthenticated = useSelector(selectors);
  console.log('routes isAuthenticated:--',isAuthenticated)
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<CreateProject />} />
        {/* <Route path="/home" element={<ProtectedRoute isAuthenticated = {isAuthenticated} component={Home} > </ProtectedRoute>} />
        <Route path="/findjob" element={<ProtectedRoute isAuthenticated = {isAuthenticated} component={Findjob} > </ProtectedRoute>} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/findjob" element={<Findjob />} />
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
        <Route path="/completeprofile" element={<CompleteProfile />} />
        <Route path = "/userProfileProjects" element={<UserProfileProjects/>}/>
        <Route path="/updateproject/:projectId" element={<UpdateProject />} />

      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default Rout;
