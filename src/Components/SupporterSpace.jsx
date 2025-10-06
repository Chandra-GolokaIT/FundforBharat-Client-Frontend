import React, { useState, useEffect } from 'react';
import './SupporterSpace.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constant';

const SupporterSpace = () => {
  const [activeTab, setActiveTab] = useState('Staff picks');
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/blogs/supportes-blog?page=0&size=4'`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeaturedArticles(data.content || data); // Handle both Page and array responses
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleArticleClick = (id) => {
    navigate(`/BlogPost/${id}`);
  };

  if (loading) {
    return <div className="supporter-space">Loading...</div>;
  }

  if (error) {
    return <div className="supporter-space">Error: {error}</div>;
  }

  return (
    <div className="supporter-space">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <div className="header-text">
            <h1>Supporter Space</h1>
            <p>Find powerful ways to make a difference with top places to donate, community stories, and tips on giving.</p>
          </div>
          <div className="header-image">
            <img src="https://indiaanimalfund.org/wp-content/uploads/2024/05/From-Compassion-to-Coexistence-A-Guide-to-Responsible.webp"
             alt="Family feeding goats" />
          </div>
        </div>
      </div>

      {/* Featured Articles Grid */}
      <div className="featured-section">
        <div className="featured-grid">
          {featuredArticles.map((article) => (
            <div key={article.id} className="featured-card"
            onClick={() => handleArticleClick(article.id)}
            role='button'>
              <div className="card-image">
                <img src={article.imageUrl || '/api/placeholder/300/200'} alt={article.title} />
              </div>
              <div className="card-info">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="author">
                  <div className="author-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#00B964"/>
                      <path d="M6 8l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>by FundForBharat Team</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupporterSpace;


// import React, { useState } from 'react';
// import './SupporterSpace.css';
// import { useNavigate } from 'react-router-dom';

// const SupporterSpace = () => {
//   const [activeTab, setActiveTab] = useState('Staff picks');
//   const navigate = useNavigate();
//   const handleArticleClick = () => {
//     navigate(`/BlogPost`);
//   };
  
//   const popularArticles = [
//     {
//       id: 1,
//       title: "Giving Back This Holiday Season? Try These Ideas",
//       author: "FundForBharat Team"
//     },
//     {
//       id: 2,
//       title: "10 Random Acts of Kindness Ideas Under ₹10",
//       author: "FundForBharat Team"
//     },
//     {
//       id: 3,
//       title: "Best Practices for Donating Safely Online with FundForBharat",
//       author: "FundForBharat Team"
//     },
//     {
//       id: 4,
//       title: "These 6 Donations From Taylor Swift Will Inspire You",
//       author: "FundForBharat Team"
//     }
//   ];

//   const featuredArticles = [
//     {
//       id: 1,
//       title: "These 6 Donations From Taylor Swift Will Inspire You",
//       description: "We know all too well that Taylor Swift cares deeply about giving back to fans.",
//       author: "FundForBharat Team",
//       image: "https://www.gofundme.com/c/wp-content/uploads/2023/07/GettyImages-1243395808.jpg"
//     },
//     {
//       id: 2,
//       title: "10 Random Acts of Kindness Ideas Under ₹100",
//       description: "Surprise someone today with one of these ideas for a random act of kindness.",
//       author: "FundForBharat Team",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLWv9RNi8sIdPdhyfW60g-KJJWFVXsA0ZpGQ&s"
//     },
//     {
//       id: 3,
//       title: "Best Children's Charities to Donate to on FundForBharat",
//       description: "Charities for kids seeking mentorship, youth medical resources, and safe places for children to grow and learn.",
//       author: "FundForBharat Team",
//       image: ""
//     },
//     {
//       id: 4,
//       title: "Are There More Ways I Can Help Beyond Donating?",
//       description: "You can help further the causes you care about with these ideas.",
//       author: "FundForBharat Team",
//       image: "/api/placeholder/300/200"
//     }
//   ];

//  // const tabs = ['Staff picks', 'Inspiration', 'Supporter FAQ', 'Where to give'];

//   return (
//     <div className="supporter-space">
//       {/* Header Section */}
//       <div className="header-section">
//         <div className="header-content">
//           <div className="header-text">
//             <h1>Supporter Space</h1>
//             <p>Find powerful ways to make a difference with top places to donate, community stories, and tips on giving.</p>
//           </div>
//           <div className="header-image">
//             <img src="https://indiaanimalfund.org/wp-content/uploads/2024/05/From-Compassion-to-Coexistence-A-Guide-to-Responsible.webp"
//              alt="Family feeding goats" />
//           </div>
//         </div>
//       </div>

      
//  {/*    }
//       <div className="nav-tabs">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`tab ${activeTab === tab ? 'active' : ''}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
// */ }
//       {/* Featured Articles Grid */}
//       <div className="featured-section">
//         <div className="featured-grid">
//           {featuredArticles.map((article) => (
//             <div key={article.id} className="featured-card"
//             onClick={() => handleArticleClick()}
//             role='button'>
//               <div className="card-image">
//                 <img src={article.image} alt={article.title} />
//               </div>
//               <div className="card-info">
//                 <h3>{article.title}</h3>
//                 <p>{article.description}</p>
//                 <div className="author">
//                   <div className="author-icon">
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                       <circle cx="8" cy="8" r="8" fill="#00B964"/>
//                       <path d="M6 8l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <span>by {article.author}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupporterSpace;