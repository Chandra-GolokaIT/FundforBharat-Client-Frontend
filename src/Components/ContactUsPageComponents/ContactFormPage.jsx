import React, { useState } from "react";
import axios from 'axios'; // Import axios
import { IoLocationOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { BASE_URL } from "../../constants/constant";

function ContactFormPage() {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [queryType, setQueryType] = useState("Inquiry");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const validateDetails = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "Please add your First name";
    }
    if (!lastName.trim()) {
      errors.lastName = "Please add your Last name";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!number.trim() || !/^\d{10}$/.test(number)) {
      errors.number = "Mobile number should be exactly 10 digits and numeric";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validateDetails();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Prepare form data according to backend model
    const formData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      number: number,
      query: queryType,
      description: description,
      formType: "contact" // Setting the form type as "contact"
    };

    setIsSubmitting(true); // Start loading

    try {
      const response = await axios.post(`${BASE_URL}/api/forms/post`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data) {
        console.log("Form submitted successfully", response.data);
        // Reset form after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setNumber("");
        setQueryType("Inquiry");
        setDescription("");
        // Show success message to user
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      let errorMessage = "An error occurred. Please try again.";

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with:", error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false); // Stop loading regardless of success/error
    }
  };

  return (
    <div className="contactformpage">
      <div className="contactform">
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="contactform-username">
            <div className="username-firstname">
              <label htmlFor="contactformFirstname">First name</label>
              <input
                type="text"
                id="contactformFirstname"
                placeholder="Rahul"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
            <div className="username-lastname">
              <label htmlFor="contactformLastname">Last name</label>
              <input
                type="text"
                id="contactformLastname"
                placeholder="Singh"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="username-email">
            <label htmlFor="contactformEmail">Email address</label>
            <input
              type="text"
              id="contactformEmail"
              value={email}
              placeholder="rahul@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>
          <div className="username-contactnumber">
            <label htmlFor="contactformContactnumber">Phone number</label>
            <input
              type="text"
              id="contactformContactnumber"
              placeholder="0000 0000 00"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {errors.number && (
              <p className="error-message">{errors.number}</p>
            )}
          </div>

          <div className="username-querytype">
            <label htmlFor="contactformQueryType">Type of Query</label>
            <select
              id="contactformQueryType"
              value={queryType}
              onChange={(e) => setQueryType(e.target.value)}
            >
              <option value="Concern">Concern</option>
              <option value="Refer">Refer</option>
              <option value="Inquiry">Inquiry</option>
            </select>
          </div>

          <div className="username-question">
            <label htmlFor="contactformQuestion">Questions or comments</label>
            <input
              type="text"
              id="contactformQuestion"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      {/* Rest of your contact information remains the same */}
      <div className="blob">
        <h5 className="blob-heading">Fund For Bharat</h5>
        <div className="contact-container">
          <IoLocationOutline color="orange" size={39} style={{ width: "20px" }} />
          {/* <span>32,East Block,Sector 16 near PuraniHaweli,Panipat,India</span> */}
          <span>Goregoan Mumbai 400065 Maharastra</span>
        </div>

        <div className="contact-container">
          <FaMobileAlt color="orange" style={{ width: "20px" }} />
          {/* <span>+91 8590404004</span> */}
          <span>+91 9876543210</span>
        </div>

        <div className="contact-container">
          <MdOutlineEmail color="orange" style={{ width: "20px" }} />
          <span>fundforbharat@gmail.com</span>
        </div>

        {/* <span className="social-links">
          <a href="#" className="link">
            <FaFacebookF />
          </a>

          <a href="#" className="link">
            <FaLinkedinIn />
          </a>
          <a href="#" className="link">
            <FaTwitter />
          </a>
        </span> */}
      </div>
      <div className="wavybackground">
        <img src="images/waive1.jpg" alt="Background" />
      </div>
    </div>
  );
}

export default ContactFormPage;


// import React, { useState } from "react";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaMobileAlt } from "react-icons/fa";
// import { MdOutlineEmail } from "react-icons/md";
// import {
//   FaWhatsapp,
//   FaInstagram,
//   FaLinkedinIn,
//   FaFacebookF,
//   FaTwitter,
// } from "react-icons/fa";

// function ContactFormPage() {
//   const [errors, setErrors] = useState({});
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [queryType, setQueryType] = useState("Inquiry");
//   const [concern, setConcern] = useState("");

//   const validateDetails = () => {
//     const errors = {};

//     if (!FirstName.trim()) {
//       errors.FirstName = "Please add your First name";
//     }
//     if (!LastName.trim()) {
//       errors.LastName = "Please add your Last name";
//     }
//     if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Please enter a valid email address";
//     }
//     if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber)) {
//       errors.phoneNumber = "Mobile number should be exactly 10 digits and numeric";
//     }
//     return errors;
//   };

//   // const handleQueryChange = (e) => {
//   //   setQueryType(e.target.value);
//   //   if (e.target.value === "Concern") {
//   //     setConcern("Raise a Concern");
//   //   } else if (e.target.value === "Refer") {
//   //     setConcern("Refer a Patient");
//   //   } else {
//   //     setConcern(""); // Clear if "Inquiry" is selected
//   //   }
//   // };

//   const contactUs = (e) => {
//     e.preventDefault();
//     setErrors({});
//     const formErrors = validateDetails();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     // Submit form data
//     const formData = {
//       FirstName,
//       LastName,
//       email,
//       phoneNumber,
//       queryType,
//       concern, // This will hold "Raise a Concern" or "Refer a Patient" if selected
//     };

//     console.log("Form submitted successfully", formData);
//   };

//   return (
//     <div className="contactformpage">
//       <div className="contactform">
//         <h2>Contact</h2>
//         <form>
//           <div className="contactform-username">
//             <div className="username-firstname">
//               <label htmlFor="contactformFirstname">First name</label>
//               <input
//                 type="text"
//                 id="contactformFirstname"
//                 placeholder="Rahul"
//                 value={FirstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               {errors.FirstName && (
//                 <p className="error-message">{errors.FirstName}</p>
//               )}
//             </div>
//             <div className="username-lastname">
//               <label htmlFor="contactformLastname">Last name</label>
//               <input
//                 type="text"
//                 id="contactformLastname"
//                 placeholder="Singh"
//                 value={LastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               {errors.LastName && (
//                 <p className="error-message">{errors.LastName}</p>
//               )}
//             </div>
//           </div>
//           <div className="username-email">
//             <label htmlFor="contactformEmail">Email address</label>
//             <input
//               type="text"
//               id="contactformEmail"
//               value={email}
//               placeholder="rahul@gmail.com"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && (
//               <p className="error-message">{errors.email}</p>
//             )}
//           </div>
//           <div className="username-contactnumber">
//             <label htmlFor="contactformContactnumber">Phone number</label>
//             <input
//               type="text"
//               name="txtEmpPhone"
//               id="contactformContactnumber"
//               placeholder="0000 0000 00"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             {errors.phoneNumber && (
//               <p className="error-message">{errors.phoneNumber}</p>
//             )}
//           </div>

//           {/* Type of Query Dropdown */}
//           <div className="username-querytype">
//             <label htmlFor="contactformQueryType">Type of Query</label>
//             <select
//               id="contactformQueryType"
//               value={queryType}
//               onChange={(e) => setQueryType(e.target.value)}
//             >
//               <option value="Concern">Concern</option>
//               <option value="Refer">Refer</option>
//               <option value="Inquiry">Inquiry</option>
//             </select>
//           </div>

//           {/* Hidden field for concern/refer */}
//           {concern && (
//             <input type="hidden" value={concern} readOnly />
//           )}

//           <div className="username-question">
//             <label htmlFor="contactformQuestion">Questions or comments</label>
//             <input type="text" id="contactformQuestion" placeholder="" />
//           </div>
//           <button onClick={contactUs}>Submit</button>
//         </form>
//       </div>
//       {/* Contact Information */}
//       <div className="blob">
//         <h5 className="blob-heading">Fund For Bharat</h5>
//         <div className="contact-container">
//           <IoLocationOutline color="orange" size={39} style={{ width: "20px" }} />
//           <span>32,East Block,Sector 16 near PuraniHaweli,Panipat,India</span>
//         </div>

//         <div className="contact-container">
//           <FaMobileAlt color="orange" style={{ width: "20px" }} />
//           <span>+91 8590404004</span>
//         </div>

//         <div className="contact-container">
//           <MdOutlineEmail color="orange" style={{ width: "20px" }} />
//           <span>fundforbharat@gmail.com</span>
//         </div>

//         <span className="social-links">
//           <a href="#" className="link">
//             <FaFacebookF />
//           </a>

//           <a href="#" className="link">
//             <FaLinkedinIn />
//           </a>
//           <a href="#" className="link">
//             <FaTwitter />
//           </a>
//         </span>
//       </div>
//       <div className="wavybackground">
//         <img src="images/waive1.jpg" alt="Background" />
//       </div>
//     </div>
//   );
// }

// export default ContactFormPage;
