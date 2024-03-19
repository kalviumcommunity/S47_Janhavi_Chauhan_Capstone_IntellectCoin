import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/ProfileAbout';
import Educations from './components/Education';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Findjob from './pages/Findjob';
import Navbar from './pages/Navbar';
import Events from './pages/Events';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Whyus from './pages/Whyus';
import Aboutus from './pages/AboutUs';


import './App.css'; 
import'./pages/Heading.css';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Navbar />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/registration"><button>About</button></Link>
              <br />
              <Link to="/educations"><button>Educations</button></Link>
              <br />
              <Link to="/login"><button>Login</button></Link>
              <br />
              <Link to="/signup"><button>Signup</button></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/educations" element={<Educations />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/Findjob" element={<Findjob />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Whyus" element={<Whyus />} />
          <Route path="/Aboutus" element={<Aboutus />} />
      
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
