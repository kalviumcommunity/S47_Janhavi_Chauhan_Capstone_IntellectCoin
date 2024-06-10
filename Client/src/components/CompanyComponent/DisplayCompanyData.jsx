import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DisplayCompanyData.module.css'; 

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/companies/registrations');
        setCompanies(response.data.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}> 
      <h3>Registered Companies</h3>
      <div>
       
        {companies.map(company => (
          <div key={company._id} className={styles['company-card']}> 
            
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRkio6jUnN_FJS16iFq5pcAkCcEVUxEZKfMA&s" alt="" />
            <h4>{company.Name}</h4>
            <p><strong>Description:</strong> {company.Description}</p>
            <p><strong>Requirements:</strong> {company.Requirements}</p>
            <p><strong>LinkedIn:</strong> {company.LinkedIn}</p>
            <p><strong>Contact Us:</strong> {company.ContactUs}</p>
            <p><strong>Twitter:</strong> {company.Twitter}</p>
            <p><strong>Projects:</strong> {company.Projects}</p>
            <p><strong>Project Description:</strong> {company.ProjectDescription}</p>
            <p><strong>Project Requirement:</strong> {company.ProjectRequirement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
