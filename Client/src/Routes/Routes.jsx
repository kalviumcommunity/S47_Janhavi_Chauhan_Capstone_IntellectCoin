import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/LandingPageComponent/Navbar';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import CreateProject from '../components/UserRegistrationComponent/UserRegistration';
import Contact from '../components/LandingPageComponent/Contact';
import Whyus from '../components/LandingPageComponent/Whyus';
import Aboutus from '../components/LandingPageComponent/AboutUs';
import UpdateUser from '../components/UserRegistrationComponent/UpdateUser';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import DataDisplayPage from '../components/UserRegistrationComponent/Datadisplay';
import PersonalProfile from '../components/PersonalProfile';
import BloggingForm from '../components/BloggingComponent/BloggingForm';
import BlogDisplay from '../components/BloggingComponent/BlogDisplay';
import ProtectedRoute from '../redux/ProtectedRoute';
import Categories from '../components/LandingPageComponent/Categories';
import { useSelector } from 'react-redux';
import { selectors } from '../redux/authSlice';
import CompleteProfile from '../components/Authentication/completeProfile';
import { AuthProvider } from '../components/Authentication/AuthContext';
import UserProfileProjects from '../components/UserRegistrationComponent/UserProjectDisplay';
import UpdateProject from '../components/UserRegistrationComponent/UpdateProject';
import OtherViewer from '../components/UserRegistrationComponent/OtherViewer';
import JoinUs from '../components/LandingPageComponent/JoinUs';


// Books
import Booksbrowse from '../components/Books/Booksbrowse';
import Createbook from '../components/Books/Createbook';
import BooksCart from '../components/Books/BooksCart';

function Rout() {
  const isAuthenticated = useSelector(selectors);
  console.log('routes isAuthenticated:--', isAuthenticated);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/registration" element={<CreateProject />} />
          {/* <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={Home} />} /> */}

          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/whyus" element={<Whyus />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/allprojectRoute" element={<DataDisplayPage />} /> */}
          <Route path='/allprojectRoute' element={<ProtectedRoute isAuthenticated={isAuthenticated} component={DataDisplayPage} />} />
          <Route path="/personalprofile/:id" element={<PersonalProfile />} />
          <Route path="/bloggingform" element={<BloggingForm />} />
          {/* <Route path="/blogdisplay" element={<BlogDisplay />} /> */}
          <Route path='/blogdisplay' element={<ProtectedRoute isAuthenticated={isAuthenticated} component={BlogDisplay} />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/userProfileProjects" element={<UserProfileProjects />} />
          <Route path="/updateproject/:projectId" element={<UpdateProject />} />
          <Route path="/otherusers/:userId" element={<OtherViewer />} />
          <Route path="/books" element={<Booksbrowse />} />
          <Route path="/books/create" element={<Createbook />} />
          <Route path="/books/cart" element={<BooksCart />} />
          <Route path="/joinus" element={<JoinUs />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Rout;
