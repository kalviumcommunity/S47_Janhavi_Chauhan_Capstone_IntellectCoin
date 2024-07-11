import React, { useState } from 'react';
import axios from 'axios';

function Createbook() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: [] // This will hold the URLs after upload to Cloudinary
  });
  const [imgFile, setImgFile] = useState([]); // To hold selected image files
  const [previewImages, setPreviewImages] = useState([]); // To hold image previews

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const newImgFiles = [...imgFile, ...files]; // Append new files to existing files
    setImgFile(newImgFiles); // Update state with the combined array
  
    const newImagePreviewUrls = files.map(file => URL.createObjectURL(file)); // Generate URLs for new files
    const updatedPreviewImages = [...previewImages, ...newImagePreviewUrls]; // Append new URLs to existing previews
    setPreviewImages(updatedPreviewImages); // Update state with the combined previews
  };

  const handleRemoveImage = (index) => {
    const newImgFile = [...imgFile];
    newImgFile.splice(index, 1);
    setImgFile(newImgFile);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const uploadImages = async () => {
    const urls = [];
    for (const file of imgFile) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'IntellectCoin'); // Replace with your Cloudinary upload preset
      formData.append('cloud_name', 'janhavi'); // Replace with your Cloudinary cloud name
      try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/janhavi/image/upload', formData); // Replace with your Cloudinary URL
        urls.push(res.data.secure_url);
        console.log(res.data.secure_url);
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
      }
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrls = await uploadImages(); // Upload image to Cloudinary and get URLs
    const completeFormData = { ...formData, image: imageUrls };

    try {
      // Replace '' with your actual endpoint for submitting the book data
      const response = await axios.post('http://localhost:4000/api/book/create', completeFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        }
      });
      console.log(response.data);
      // Handle success (e.g., showing a success message, redirecting, etc.)
    } catch (error) {
      console.error("Error creating book:", error);
      // Handle error (e.g., showing an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Price:</label>
      <input type="text" name="price" value={formData.price} onChange={handleChange} />

      <label>Images:</label>
      <input type="file" name="image" multiple onChange={handleImageChange} />
      <div className="image-previews">
        {previewImages.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image} alt="Preview" style={{ width: "100px", height: "100px" }} />
            <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>

      <button type="submit">Create Book</button>
    </form>
  );
}

export default Createbook;