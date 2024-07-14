import React, { useState } from 'react';
import axios from 'axios';

const DeleteProject = ({ projectId, onProjectDeleted }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteProject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Unauthenticated');
        return;
      }

      setLoading(true);

      await axios.delete(`https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/userregistration/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLoading(false);
      setMessage('Project deleted successfully!');
      onProjectDeleted();
    } catch (error) {
      setLoading(false);
      setMessage('Error deleting project');
    }
  };

  return (
    <>
      <button onClick={handleDeleteProject} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Project'}
      </button>
      {message && <p>{message}</p>}
    </>
  );
};

export default DeleteProject;
