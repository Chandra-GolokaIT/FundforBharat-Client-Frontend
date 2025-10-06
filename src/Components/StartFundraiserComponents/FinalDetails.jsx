import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

function FinalDetails({ formnumber, setFormnumber, formData, setFormData, onComplete }) {
    const [errors, setErrors] = useState({});
    const [securityAnswear, setSecurityAnswear] = useState('');

    const validateFinalDetails = () => {
        const errors = {}

        if (!selectedSecurityQuestion) {
            errors.selectedSecurityQuestion = "plese choose a question"
        }
        if (!securityAnswear.trim()) {
            errors.securityAnswear = "Please enter your answear"

        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const formErrors = validateFinalDetails();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setFormData((prevState) => {
            const updatedFormData = {
                ...prevState,
                securityQuestion: selectedSecurityQuestion, 
                securityAnswer: securityAnswear, 
                howYouHeard: howYouKnowUs
            };
            console.log("Updated Form Data:", updatedFormData);
            return updatedFormData;
        });
        setTimeout(() => {
            toast.success('User moved to final step successfully!!',);
        }, 500);


        onComplete();
        // //     setSecurityAnswear('');
        // //     setSelectedSecurityQuestion('');
        // //     setHowYouKnowUs('');
        // // }
        // // if(userImage)


        setFormnumber((formnumber) => formnumber + 1)

    };

    useEffect(() => {
        console.log("Received Form Data in Next Step:", formData);
    }, [formData]);

    const securityQuestions = [
        'What was the name of your first pet?',
        'What is your mothers maidan name?',
        'What is the colour of your first car',
    ]
    const yourhearfrom = ['Search Engine', 'Friends and Family', 'Facebook', 'Instagram', 'Others']
    const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState(securityQuestions[2]);
    const [howYouKnowUs, setHowYouKnowUs] = useState("")

    return (
        <div className='fundraiserstory_container'>
            <form onSubmit={handleSubmit} >
                <div className="fundraiserstory_main-heading">Final Details</div>
                <div className="yourfundraiserstory_container">
                    <div className="storycontainersubheading">Fundraiser links</div>
                    {/* <div className="storycontainerpara">Is this fundraiser shown in other places? If so, add links to those pages.</div>
                <div className="input-group custom_input-group" style={{ borderRadius: '10px', marginTop: '10px' }}>
                    <div className="input-group-prepend custom-input-group-prepend">
                        <div className="dropdown ">
                            <button
                                className="btn dropdown-toggle donate_now_modal_header-button"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Facebook
                            </button>
                            <ul className="dropdown-menu donate_now_modal_header-dropdown-menu">
                                <li className="dropdown-item">LinkedIn</li>
                                <li className="dropdown-item">Whatsapp</li>
                                <li className="dropdown-item">Instagram</li>
                            </ul>
                        </div>
                    </div>
                    <input type="text" className="donate_now_modal_input" placeholder='Enter URL' />
                </div> */}
                </div>
                {/* <div className="yourfundraiserstory_container" style={{ paddingTop: '50px' }}>
                    <div className="storycontainersubheading">Account security question</div>
                    <div className="storycontainerpara">Please pick and answer a security question. We will ask you for the answer in the event of you losing access to your account and associated email address.</div>
                    <select
                        id="country"
                        className="form-select bordered-form-select border-radius-form-select"
                        value={selectedSecurityQuestion}
                        onChange={(e) => setSelectedSecurityQuestion(e.target.value)}
                        required

                    >
                        <option value="" disabled>What is the colour of your first car</option>
                        {securityQuestions.map((question, index) => (
                            <option key={index} value={question}>{question}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTitle"
                        placeholder="Your answer"
                        value={securityAnswear}
                        onChange={(e) => setSecurityAnswear(e.target.value)}
                        style={{ marginTop: '20px' }}
                    />
                    {errors.securityAnswear && (<p className='error-message'> {errors.securityAnswear} </p>)}
                </div> */}
                <div className="yourfundraiserstory_container" style={{ paddingTop: '50px' }}>
                    <div className="storycontainersubheading">How did you hear about us?</div>
                    <select
                        id="country"
                        className="form-select bordered-form-select border-radius-form-select"
                        value={howYouKnowUs}
                        onChange={(e) => setHowYouKnowUs(e.target.value)}
                        style={{ width: '250px' }}
                    >
                        <option value="" disabled>Please Choose</option>
                        {yourhearfrom.map((source, index) => (
                            <option key={index} value={source}>{source}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#F15913', fontSize: '18px', fontWeight: '600', width: '100%', marginTop: '20px' }}
                >
                    Continue
                </button>
            </form>
        </div>
    )
}

export default FinalDetails