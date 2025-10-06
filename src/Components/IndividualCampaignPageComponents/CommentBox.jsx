import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const CommentBox = ({ campaignId }) => {
  const [allComments, setAllComments] = useState([]); // Stores all loaded comments
  const [displayedComments, setDisplayedComments] = useState([]); // Comments to display
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Anonymous user");
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(false); // Whether more comments are available
  const commentsPerPage = 4; // Number of comments to load per page
   const fullName = localStorage.getItem('fullName');
 useEffect(() => {
  const userData = localStorage.getItem('user');
  console.log('Raw userData from localStorage:', userData); // Debug log
 
  
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      console.log('Parsed user object:', parsedUser); // Debug log
      
      if (parsedUser.name) {
        setUserName(parsedUser.name);
      } else {
        console.warn('fullName property not found in user object');
      }
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  } else {
    console.warn('No user data found in localStorage');
  }
}, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } : {};

        const response = await axios.get(
          `${BASE_URL}/api/comments/campaign/${campaignId}`,
          config
        );

        // Store all comments
        setAllComments(response.data);

        // Check if there are more comments to load
        setHasMore(response.data.length > commentsPerPage);

        // Initially display first page of comments
        setDisplayedComments(response.data.slice(0, commentsPerPage * page));
      } catch (err) {
        setError("Failed to load comments");
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [campaignId]);

  // load more comments when page changes
  useEffect(() => {
    if (allComments.length > 0) {
      setDisplayedComments(allComments.slice(0, commentsPerPage * page));
      setHasMore(allComments.length > displayedComments.length);
    }
  }, [page, allComments]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (newComment.trim() === "") {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } : {};

      const response = await axios.post(
        `${BASE_URL}/api/comments/campaign/${campaignId}`,
        {
          name: fullName,
          message: newComment
        },
        config
      );

      // add new comment to the beginning of all comments
      const updatedComments = [response.data, ...allComments];
      setAllComments(updatedComments);

      // reset to first page with new comment
      setPage(1);
      setDisplayedComments(updatedComments.slice(0, commentsPerPage));

      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
      if (err.response && err.response.status === 401) {
        alert("Please login to post comments");
      } else {
        alert("Failed to post comment");
      }
    }
  };

  const loadMoreComments = () => {
    setPage(prevPage => prevPage + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>Comments ({allComments.length})</h5>
      </div>
      <div className="card-body">
        <div id="comment-input" className="d-flex justify-content-center align-items-center">
          <FaUserCircle style={{ marginRight: "5px" }} size={45} />
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Share your well wishes here"
              value={newComment}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="mx-2"
            style={{
              color: "#fff",
              background: "#d54400",
              border: "none",
              borderRadius: "30px",
              padding: "5px 20px",
            }}
            onClick={handlePostComment}
            disabled={!localStorage.getItem('token')}
            title={!localStorage.getItem('token') ? "Please login to comment" : ""}
          >
            Post
          </button>
        </div>
        {!localStorage.getItem('token') && (
          <div className="text-muted small mb-3">
            You need to <a href="/login">login</a> to post comments
          </div>
        )}
        <div className="my-4">
          {displayedComments.map((comment, index) => (
            <div key={index} className="p-2" style={{ borderTop: "1px solid lightGrey" }}>
              <p>
                <b>{comment.name}</b>
                <br />
                <span style={{ color: "grey", fontSize: "15px" }}>
                  {formatDate(comment.createdAt)}
                </span>
              </p>
              <p>{comment.message}</p>
            </div>
          ))}

          {hasMore && (
            <button
              onClick={loadMoreComments}
              className="btn btn-outline-secondary btn-sm"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;