import React, { useState } from 'react';
import HomeBodyNav from '../components/HomePageComponent/HomeBodyNav';
import HomeHorizontal from '../components/HomePageComponent/HomeHorizontalNav';
import HomeHeader from '../components/HomePageComponent/HomeHeader';
import SideNavbar from '../components/HomePageComponent/HomeNavbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataDisplayPage from '../components/UserRegistrationComponent/Datadisplay';
import CompanyList from '../components/CompanyComponent/DisplayCompanyData';
import BlogDisplay from '../components/BloggingComponent/BlogDisplay';


// Placeholder components for the different content sections
const BrowseProjects = () => <div> <DataDisplayPage/></div>;
const Company = () => <div> <CompanyList/> </div>;
const Blogs = () => <div> <BlogDisplay/></div>;

function Home() {
  const isAuthenticated = useSelector(state => state.root);
  const [selectedContent, setSelectedContent] = useState('browseProjects');

  console.log('routes isAuthenticated:--', isAuthenticated);

  const renderContent = () => {
    switch (selectedContent) {
      case 'browseProjects':
        return <BrowseProjects />;
      case 'companyList':
        return <Company />;
      case 'blogs':
        return <Blogs />;
      default:
        return <BrowseProjects />;
    }
  };

  return (
    <>
      <HomeHorizontal />
      {/* <HomeHeader /> */}
      {/* <HomeBodyNav setSelectedContent={setSelectedContent} /> */}
      {/* <SideNavbar /> */}
  
        {/* {renderContent()} */}
    
    </>
  );
}

export default Home;
