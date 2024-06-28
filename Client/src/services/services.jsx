import axios from 'axios';

const API_URL = 'http://localhost:4000/api/user'; // Adjust to your backend URL

export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// export const getUser = (id) => {
//     return axios.get(`${API_URL}/signupDetails/${id}`);
// };

export const getUser = (token) => {
    return axios.get(`${API_URL}/signupDetails`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getBlogsForUser = async (token, userId) => {
    try {
        const response = await axios.get(`${API_URL}/blogs/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user blogs:', error);
        throw error;
    }
};
export const login = (userData) => {
    return axios.post(`${API_URL}/login`, userData);
};

export const updateUser = (id, userData, token) => {
    return axios.post(`${API_URL}/update/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteUser = (id, token) => {
    return axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getPostUser = () => {
    return axios.get(`${API_URL}/getPostUser`);
};

export const verifyUser = (token) => {
    return axios.post(`${API_URL}/VerifyUser`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
