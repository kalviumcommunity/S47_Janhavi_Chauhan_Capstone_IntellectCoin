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
    pic: null,
  });
  const [picPreview, setPicPreview] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/registerations/${id}`);
      setFormData(response.data.data);
      setPicPreview(response.data.data.pic); // Assuming the pic URL is returned in the data
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      pic: file,
    }));
    setPicPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await axios.put(`http://localhost:4000/register/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
          <div>
            <input type="file" name="pic" onChange={handleFileChange} />
            {picPreview && (
              <div>
                <img src={picPreview} alt="Profile Preview" style={{ width: '150px', height: '150px' }} />
              </div>
            )}
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
