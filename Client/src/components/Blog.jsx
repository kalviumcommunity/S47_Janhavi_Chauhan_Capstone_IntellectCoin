import React, { useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
ls
  ]);

  const [currentPost, setCurrentPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const selectPost = (postId) => {
    const post = posts.find(post => post.id === postId);
    setCurrentPost(post);
  };

  const renderPosts = () => {
    return posts.map(post => (
      <div key={post.id} onClick={() => selectPost(post.id)}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ));
  };

  const handleTitleChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent
    };
    setPosts([...posts, newPost]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div>
      <h1>Welcome to the Blog!</h1>

      <div className="posts">{renderPosts()}</div>

      {currentPost && (
        <div className="current-post">
          <h2>{currentPost.title}</h2>
          <p>{currentPost.content}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Add New Post</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newPostTitle}
          onChange={handleTitleChange}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={newPostContent}
          onChange={handleContentChange}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Blog;
