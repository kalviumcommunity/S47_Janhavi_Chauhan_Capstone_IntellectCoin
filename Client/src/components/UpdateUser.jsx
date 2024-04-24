import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Category: "",
    About: "",
    linkedin: "",
    github: "",
    languages: "",
    CollegeName: "",
    Degree: "",
    YearOfStudy: "",
    Skills: "",
    AboutEducation: "",
    ProjectCode: "",
    DeployedLink: "",
    Certificates: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/registrations/${id}`
      );
      setFormData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/register/${id}`, formData);
      alert("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Error updating user information. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Edit User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Personal Information</h3>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
          />
          <textarea
            name="About"
            value={formData.About}
            onChange={handleChange}
          />
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Education Information</h3>
          <input
            type="text"
            name="CollegeName"
            value={formData.CollegeName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Degree"
            value={formData.Degree}
            onChange={handleChange}
          />
          <input
            type="text"
            name="YearOfStudy"
            value={formData.YearOfStudy}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Skills"
            value={formData.Skills}
            onChange={handleChange}
          />
          <input
            type="text"
            name="AboutEducation"
            value={formData.AboutEducation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ProjectCode"
            value={formData.ProjectCode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="DeployedLink"
            value={formData.DeployedLink}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Certificates"
            value={formData.Certificates}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
