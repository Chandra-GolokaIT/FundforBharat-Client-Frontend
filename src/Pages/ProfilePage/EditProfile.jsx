import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/constant';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    imageUrl: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/api/users/get-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({
          fullname: res.data.fullname || '',
          email: res.data.email || '',
          username: res.data.username || '',
          imageUrl: res.data.profilePictureUrl || ''
        });
      } catch (err) {
        setMessage('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      console.log('Selected image:', e.target.files[0]);
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');

    try {
      // 1. Update user info
      await axios.put(`${BASE_URL}/api/users/update-user/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem('fullName', formData.fullname);

      // 2. Upload profile picture (if selected)
      console.log('Submitting... Profile picture is:', profilePicture);
      if (profilePicture) {
        const imageFormData = new FormData();
        imageFormData.append('image', profilePicture);

        const imageRes = await axios.put(
          `${BASE_URL}/api/users/${userId}/profile-picture`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

if (imageRes.data.imageUrl) {
  const newUrl = imageRes.data.imageUrl;
  setFormData(prev => ({
    ...prev,
    imageUrl: newUrl
  }));
  localStorage.setItem('imageUrl', newUrl);
}
        
      }

      setMessage('Profile updated successfully!');
      navigate('/');
      toast.success('Profile updated successfully!'); 
      
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    }
  };

  if (loading) return <div className="edit-profile-loading">Loading...</div>;

  return (
    <div className="edit-profile-container" style={{ marginTop: '150px' }}>
      <div className="edit-profile-card">
        <h2 className="edit-profile-title">Edit Profile</h2>
        {message && <p className="edit-profile-message">{message}</p>}

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {(profilePicture || formData.imageUrl) && (
            <div className="preview-container">
              <img
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : formData.imageUrl
                }
                alt="Profile Preview"
                className="circular-preview"
              />
            </div>
          )}

          <label>
            Profile Picture
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <label>
            Full Name
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </label>
          <button type="submit" className="edit-profile-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
