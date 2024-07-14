import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateBooks.module.css';
import HomeHorizontal from '../HomePageComponent/HomeHorizontalNav';

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
      const response = await axios.post('http://localhost:4000/api/book/create', completeFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        }
      });
      console.log(response.data);
      alert('Book created successfully!'); // Add alert for successful book creation
      // Optionally, clear the form or redirect the user
      setFormData({
        title: '',
        description: '',
        price: '',
        image: []
      });
      setImgFile([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error creating book:", error);
      alert('Error creating book. Please try again.'); // Add alert for error
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720915200&semt=ais_user"
          alt="Books"
        />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.Title}
            placeholder="Title"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.Description}
            placeholder="Description"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={styles.Price}
            placeholder="Price"
          />
          <input
            type="file"
            name="image"
            multiple
            onChange={handleImageChange}
            className={styles.Image}
          />
          <div className={styles.imagePreviews}>
            {previewImages.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={image} alt="Preview" />
                <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button type="submit">Create Book</button>
        </form>
      </div>
    </div>
  );
}

export default Createbook;
