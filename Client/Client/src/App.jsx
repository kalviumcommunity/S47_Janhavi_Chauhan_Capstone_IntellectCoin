import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/About';
import Educations from './components/Education';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/registration"><button>About</button></Link>
              <br />
              <Link to="/educations"><button>Educations</button></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/educations" element={<Educations />} />
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return <h1>Home</h1>;
}

export default App;
