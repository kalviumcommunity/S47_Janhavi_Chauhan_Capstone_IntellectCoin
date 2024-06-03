import React,{useState} from "react";
import axios from "axios";


const BloggingForm = () => {
    const [blogdata, setBlogdata] = useState({
        Title: "",
        Description: "",
        Image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogdata((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/blogs/addblog", blogdata);
            console.log(response.data);
            setBlogdata({
                Title: "",
                Description: "",
                Image: "",
            });
            alert("Blog posted successfully");
        } catch (error) {
            console.error(error);
            alert("Error posting blog. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="Title" value={blogdata.Title} onChange={handleChange} />
                <label>Description:</label>
                <input type="text" name="Description" value={blogdata.Description} onChange={handleChange} />
                <label>Image:</label>
                <input type="text" name="Image" value={blogdata.Image} onChange={handleChange} />
                <button type="submit">Post</button>
            </form>
        </div>

    )
}

export default BloggingForm
    

