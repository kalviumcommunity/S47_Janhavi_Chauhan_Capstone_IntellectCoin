
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Education.css';

function Educations() {
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    CollegeName: '',
    Degree: '',
    YearOfStudy: '',
    Skills: '',
    About: '',
    ProjectCode: '',
    DeployedLink: '',
    Certificates: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/educations');
      setEducations(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/education', formData);
      setFormData({
        CollegeName: '',
        Degree: '',
        YearOfStudy: '',
        Skills: '',
        About: '',
        ProjectCode: '',
        DeployedLink: '',
        Certificates: ''
      });
      fetchData(); 
    } catch (error) {
      console.error('Error posting education:', error);
    }
  };

  return (
    <div className='Container'>
      <h2>Educations</h2>
      <form onSubmit={handleSubmit}>
          <input type="text" name="CollegeName" value={formData.CollegeName} placeholder='College Name' onChange={handleChange} />
          <input type="text" name="Degree" value={formData.Degree}placeholder='Degree' onChange={handleChange} />
          <input type="text" name="YearOfStudy" value={formData.YearOfStudy} placeholder='Year of Study' onChange={handleChange} />
          <input type="text" name="Skills" value={formData.Skills} placeholder='Skills' onChange={handleChange} />
          <input type="text" name="About" value={formData.About} placeholder='About' onChange={handleChange} />
          <input type="text" name="ProjectCode" value={formData.ProjectCode} placeholder='Project Code Link' onChange={handleChange} />
          <input type="text" name="DeployedLink" value={formData.DeployedLink} placeholder='Deployed Link' onChange={handleChange} />
          <input type="text" name="Certificates" value={formData.Certificates} placeholder='Certificates' onChange={handleChange} />
        <button type="submit">Add Education</button>
      </form>
      
      <ul>
        {educations.map(education => (
          <li key={education._id}>
            <p>College Name: {education.CollegeName}</p>
            <p>Degree: {education.Degree}</p>
            <p>Year of Study: {education.YearOfStudy}</p>
            <p>Skills: {education.Skills}</p>
            <p>About: {education.About}</p>
            <p>Project Code: <a href={education.ProjectCode}>Code Link</a></p>
            <p>Deployed Link: <a href={education.DeployedLink}>Deployed Link</a></p>
            <p>Certificates: {education.Certificates}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Educations;
