import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import axios from 'axios';
import './Testimonials2.css';
import { BASE_URL } from '../../constants/constant';

const TestimonialSection=() =>  {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs/testimonials`);
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  if (loading) {
    return (
      <div className="testimonial-section">
        <div className="loading-spinner">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonial-section">
        <div className="error-message">Error loading testimonials: {error}</div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="testimonial-section">
        <div className="no-testimonials">No testimonials available at the moment.</div>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];
  const displayNumber = (currentIndex + 1).toString().padStart(2, '0');
  const totalNumber = testimonials.length.toString().padStart(2, '0');
  
  return (
    <div className="testimonial-section">
      {/* Decorative elements */}
      <div className="decorative-icon">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#f5b70d" />
          <path d="M50,20 Q70,40 50,60 Q30,80 50,90" fill="#0c3c32" />
          <circle cx="40" cy="40" r="5" fill="#0c3c32" />
        </svg>
      </div>
      
      {/* Testimonial header */}
      <div className="testimonial-header">
        <div className="divider1"></div>
        <span className="subtitle cedarville-cursive-regular">Testimonials</span>
        <div className="divider2"></div>
      </div>
      <div className="testimonial-subheader">
        <h2 className="title">
          What People Say About <br /> Our Charity
        </h2>
      </div>
      
      {/* Testimonial content */}
      <div className="testimonial-content">
        <div className="testimonial-container">
          {/* Left side - image */}
          <div className="testimonial-image-container">
            <div className="testimonial-rating">
              <span className="star">★</span>
              <span className="value">5.0</span>
            </div>
            <div className="testimonial-image-wrapper">
              {currentTestimonial.imageUrl ? (
                <img 
                  src={currentTestimonial.imageUrl}
                  alt={currentTestimonial.title}
                  className="testimonial-image"
                  onError={(e) => {
                    e.target.src = 'https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3';
                  }}
                />
              ) : (
                <img 
                  src="https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3"
                  alt="Default testimonial"
                  className="testimonial-image"
                />
              )}
            </div>
          </div>
          
          {/* Right side - content */}
          <div className="testimonial-text-container">
            <div className="testimonial-quote">
              <p className="testimonial-quote-text">
                {currentTestimonial.description}
              </p>
            </div>
            
            <div className="testimonial-author">
              <div className="testimonial-author-info">
                <h3 className="name">{currentTestimonial.title || "Anonymous"}</h3>
                <p className="title">Beneficiary</p>
              </div>
              <div className="testimonial-decorative-icon">
                <svg viewBox="0 0 50 50">
                  <path d="M10,25 Q25,10 40,25 M10,25 Q25,40 40,25" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="testimonial-navigation">
          <div className="testimonial-buttons">
            <button 
              onClick={handlePrev}
              className="nav-button"
            >
              <ChevronLeft className="icon" />
            </button>
            <button 
              onClick={handleNext}
              className="nav-button"
            >
              <ChevronRight className="icon" />
            </button>
          </div>
          
          <div className="testimonial-indicators">
            <span className="testimonial-count">{displayNumber}</span>
            <div className="testimonial-progress">
              <div 
                className="testimonial-progress-fill" 
                style={{ width: `${(currentIndex + 1) / testimonials.length * 100}%` }}
              ></div>
            </div>
            <span className="testimonial-total">{totalNumber}</span>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <div className="scroll-top-button">
        <ArrowUp className="icon" />
      </div>
    </div>
  );
}

export default TestimonialSection;



// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
// import './Testimonials2.css'

// // Mock data for testimonials
// const testimonials = [
//   {
//     id: 1,
//     quote: "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
//     name: "Alex Furnandes",
//     title: "CEO, Founder",
//     rating: 5.0,
//     image: "https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3"
//   },
//   {
//     id: 2,
//     quote:  "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
//     name: "Sarah Johnson",
//     title: "Regular Donor",
//     rating: 5.0,
//     image: "https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3"
//   },
//   {
//     id: 3,
//     quote: "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
//     name: "Michael Chen",
//     title: "Volunteer Coordinator",
//     rating: 5.0,
//     image: "https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3"
//   },
//   {
//     id: 4,
//     quote: "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
//     name: "Priya Patel",
//     title: "Board Member",
//     rating: 5.0,
//     image: "https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3"
//   },
// ];

// export default function TestimonialSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };
  
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//     );
//   };
  
//   const currentTestimonial = testimonials[currentIndex];
//   const displayNumber = (currentIndex +1).toString().padStart(2, '0');
//   const totalNumber = (testimonials.length + 2).toString().padStart(2, '0');
  
//   return (
//     <div className="testimonial-section">
//       {/* Decorative elements */}
//       {/* <div className="decorative-wave">
//         <div className="relative h-full w-full">
//           <div className="absolute top-1/4 left-0 w-full">
//             <svg viewBox="0 0 200 400">
//               <path 
//                 d="M10,10 Q130,50 10,120 Q130,190 10,260 Q130,330 10,390" 
//                 fill="none" 
//                 stroke="#0c3c32" 
//                 strokeWidth="30"
//               />
//             </svg>
//           </div>
//         </div>
//       </div> */}
      
//       <div className="decorative-icon">
//         <svg viewBox="0 0 100 100">
//           <circle cx="50" cy="50" r="40" fill="#f5b70d" />
//           <path d="M50,20 Q70,40 50,60 Q30,80 50,90" fill="#0c3c32" />
//           <circle cx="40" cy="40" r="5" fill="#0c3c32" />
//         </svg>
//       </div>
      
//       {/* Testimonial header */}
//       <div className="testimonial-header">
//         <div className="divider1"></div>
//         <span className="subtitle cedarville-cursive-regular">Testimonials</span>
//         <div className="divider2"></div>
//       </div>
//       <div className="testimonial-subheader">
//         <h2 className="title">
//           What People Say About <br /> Our Charity
//         </h2>
//       </div>
      
//       {/* Testimonial content */}
//       <div className="testimonial-content">
//         <div className="testimonial-container">
//           {/* Left side - image */}
//           <div className="testimonial-image-container">
//             <div className="testimonial-rating">
//               <span className="star">★</span>
//               <span className="value">{currentTestimonial.rating}</span>
//             </div>
//             <div className="testimonial-image-wrapper">
//               <img 
//                 src={currentTestimonial.image}
//                 alt={currentTestimonial.name}
//                 className="testimonial-image"
//               />
//             </div>
//           </div>
          
//           {/* Right side - content */}
//           <div className="testimonial-text-container">
//             <div className="testimonial-quote">
//               <p className="testimonial-quote-text">
//                 {currentTestimonial.quote}
//               </p>
//             </div>
            
//             <div className="testimonial-author">
//               <div className="testimonial-author-info">
//                 <h3 className="name">{currentTestimonial.name}</h3>
//                 <p className="title">{currentTestimonial.title}</p>
//               </div>
//               <div className="testimonial-decorative-icon">
//                 <svg viewBox="0 0 50 50">
//                   <path d="M10,25 Q25,10 40,25 M10,25 Q25,40 40,25" stroke="currentColor" fill="none" strokeWidth="2" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation */}
//         <div className="testimonial-navigation">
//           <div className="testimonial-buttons">
//             <button 
//               onClick={handlePrev}
//               className="nav-button"
//             >
//               <ChevronLeft className="icon" />
//             </button>
//             <button 
//               onClick={handleNext}
//               className="nav-button"
//             >
//               <ChevronRight className="icon" />
//             </button>
//           </div>
          
//           <div className="testimonial-indicators">
//             <span className="testimonial-count">{displayNumber}</span>
//             <div className="testimonial-progress">
//               <div 
//                 className="testimonial-progress-fill" 
//                 style={{ width: `${(currentIndex + 1) / testimonials.length * 100}%` }}
//               ></div>
//             </div>
//             <span className="testimonial-total">{totalNumber}</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Scroll to top button */}
//       <div className="scroll-top-button">
//         <ArrowUp className="icon" />
//       </div>
//     </div>
//   );
// }