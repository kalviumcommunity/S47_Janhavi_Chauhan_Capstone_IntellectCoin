import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Findjob from './pages/Findjob';
import Navbar from './pages/Navbar';
import Events from './pages/Events';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Whyus from './pages/Whyus';
import Aboutus from './pages/AboutUs';
import UpdateUser from './components/UpdateUser';
import RegistrationAndEducationForm from './components/Profile';
import DataDisplayPage from './components/Datadisplay';
import Login from './components/Login';
import Signup from './components/Signup';
import CompanyRegistration from './components/CompanyProfile';
import CompanyList from './components/DisplayCompanyData';
import LandingPage from './components/LandingPage';
import './App.css'; 
import'./pages/Heading.css';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationAndEducationForm />} />
          <Route path="/Findjob" element={<Findjob />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Whyus" element={<Whyus />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/companyregister" element={<CompanyRegistration />} />
         <Route path="/UserProfileData" element={<DataDisplayPage />}></Route>
         <Route path="/companylist" element={<CompanyList />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

function Home() {
  return (
    <>

      <LandingPage/>
      {/* <Link to ="/companyregister"><button>Company Registration</button></Link>
      <Link to ="/UserProfileData">Browse Projects</Link>
      <Link to ="/companylist">Company List</Link>
      <Link to="/registration"><button>Registration</button></Link> */}
    </>
  );
}

export default App;
