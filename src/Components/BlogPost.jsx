import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogPost.css';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../constants/constant';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading blog...</p>
    </div>
  );
  
  if (!blog) return (
    <div className="error-container">
      <div className="error-icon">📄</div>
      <h2>Blog not found</h2>
      <p>The blog post you're looking for doesn't exist.</p>
    </div>
  );

  return (
    <div className="blog-post">
      <div className="blog-hero">
        <div className="hero-gradient"></div>
        <div className="blog-container">
          <div className="blog-header">
            <div className="blog-tags">
              <span className="tag">{blog.type}</span>
            </div>
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta">
              <div className="author-info">
                <div className="author-avatar">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#00B964" />
                    <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="author-name">by FundForBharat Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="blog-content">
        <div className="blog-container">
          <div className="content-wrapper">
            <div className="blog-layout">
              {blog.imageUrl && (
                <div className="image-container">
                  <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                </div>
              )}
              
              <div className="blog-intro">
                <p className="intro-text">{blog.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;