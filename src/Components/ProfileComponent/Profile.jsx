import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/constant';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const imgUrl = localStorage.getItem('imageUrl');
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/users/get-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
        localStorage.setItem('fullName', response.data.fullname);
        localStorage.setItem('imageUrl', response.data.profilePictureUrl);

      } catch (error) {
        console.error('Error fetching profile:', error);
        // redirect to login
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, userId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
     <div className="profile-avatar-container">
  <div className="profile-avatar">
      {imgUrl && imgUrl !== "null" && imgUrl !== "undefined" ? (
        <img src={imgUrl} alt="Profile" className="profile-image" />
      ) : (
        <span className="profile-placeholder">
          {profile.fullname?.charAt(0)?.toUpperCase() || 'U'}
        </span>
      )}
  </div>
</div>


        <div className="profile-field">
          <div className="profile-field-label">
            <FaUser />
            <span>Full Name</span>
          </div>
          <div className="profile-field-value">
            {profile.fullname || 'Not provided'}
          </div>
        </div>

        <div className="profile-field">
          <div className="profile-field-label">
            <FaEnvelope />
            <span>Email</span>
          </div>
          <div className="profile-field-value">
            {profile.email || 'Not provided'}
          </div>
        </div>

        <div className="profile-field">
          <div className="profile-field-label">
            <FaPhone />
            <span>Phone</span>
          </div>
          <div className="profile-field-value">
            {profile.username || 'Not provided'}
          </div>
        </div>
        <div className="edit-button-container">
          <button className="edit-profile-button" onClick={() => navigate('/edit')}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;