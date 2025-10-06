import React, { useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import Countries from '../../CountriesData/Countries.json';
import { useContext } from 'react';
import { CategoryContext } from '../Context/CategoryContext';
function GetStartedForm({ formnumber, setFormnumber, formData, setFormData, startFundraiserRef, onComplete }) {
    const { categories } = useContext(CategoryContext);

    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [target_amount, setTargetAmount] = useState("");
    const [availableCities, setAvailableCities] = useState([]);
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [beneficiaryEmail, setBeneficiaryEmail] = useState("");
    const [beneficiaryMobile, setBeneficiaryMobile] = useState("");


    const validateGetStarted = () => {
        const errors = {};
        if (!title.trim()) {
            errors.title = "Please add your title";
        }
        if (!categoryValue.trim()) {
            errors.categories = "Please select a category";
        }
        if (!country.trim()) {
            errors.country = "Please select a country";
        }
        if (!city.trim()) {
            errors.city = "Please choose a city";
        }
        if (!firstName.trim()) {
            errors.firstName = "Please enter First Name";
        }
        if (!lastName.trim()) {
            errors.lastName = "Please enter Last Name";
        }
        if (!target_amount) {
            errors.target_amount = "Please enter target amount";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = `${firstName} ${lastName}`.trim();
        setErrors({});
        const formErrors = validateGetStarted();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setFormData({
            ...formData,
            title,
            category: categoryValue,
            country,
            city,
            fullName,
            firstName,
            lastName,
            target_amount,
            beneficiaryName,
            beneficiaryEmail,
            beneficiaryMobile,
        });

        onComplete();
        setFormnumber(formnumber + 1);
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        setAvailableCities(Countries[selectedCountry] || []);
        setCity(''); // Reset city when country changes
    };

    return (
        <div>
            <div className='get-started-form'>
                <div className='startafundraiser-form-header'>
                    <span className='startafundraiser-form-header-headline'>Get Started</span>
                </div>
                <div style={{ padding: '20px' }} ref={startFundraiserRef}>
                    <form style={{ display: 'flex', gap: '15px', flexDirection: 'column' }} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputTitle">Fundraiser title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputTitle"
                                placeholder="Add the title of your page"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <p className="error-message">{errors.title}</p>}
                        </div>

                        <div className='row'>
                            <div className="col">
                                <label htmlFor="category" className="form-label">Fundraiser category / partner</label>
                                <select
                                    id="category"
                                    className="form-select bordered-form-select"
                                    value={categoryValue}
                                    onChange={(e) => setCategoryValue(e.target.value)}
                                >
                                    <option className='option-container' value="" disabled>All Categories</option>
                                    {categories.map((category, index) => (
                                        <option key={index.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.categories && <p className="error-message">{errors.categories}</p>}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <label htmlFor="country" className="form-label">Country</label>
                                <select
                                    id="country"
                                    className="form-select bordered-form-select"
                                    value={country}
                                    onChange={handleCountryChange}
                                >
                                    <option value="" disabled>Choose country</option>
                                    {Object.keys(Countries).map((countryName, index) => (
                                        <option className='option-container' key={index} value={countryName}>{countryName}</option>
                                    ))}
                                </select>
                                {errors.country && <p className="error-message">{errors.country}</p>}
                            </div>

                            <div className='col-6'>
                                <label htmlFor="city" className="form-label">City</label>
                                <select
                                    id="city"
                                    className="form-select bordered-form-select"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={!availableCities.length}
                                >
                                    <option className='option-container' value="" disabled>Choose city</option>
                                    {availableCities.map((cityName, index) => (
                                        <option key={index} value={cityName}>{cityName}</option>
                                    ))}
                                </select>
                                {errors.city && <p className="error-message">{errors.city}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="beneficiaryName">Beneficiary Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="beneficiaryName"
                                value={beneficiaryName}
                                onChange={(e) => setBeneficiaryName(e.target.value)}
                            />
                            {errors.beneficiaryName && <p className="error-message">{errors.beneficiaryName}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="beneficiaryEmail">Beneficiary Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="beneficiaryEmail"
                                value={beneficiaryEmail}
                                onChange={(e) => setBeneficiaryEmail(e.target.value)}
                            />
                            {errors.beneficiaryEmail && <p className="error-message">{errors.beneficiaryEmail}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="beneficiaryMobile">Beneficiary Mobile Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="beneficiaryMobile"
                                value={beneficiaryMobile}
                                onChange={(e) => setBeneficiaryMobile(e.target.value)}
                            />
                            {errors.beneficiaryMobile && <p className="error-message">{errors.beneficiaryMobile}</p>}
                        </div>


                        <div className="form-group">
                            <label htmlFor="targetAmount">Target Amount (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="targetAmount"
                                placeholder="Enter your fundraising target amount"
                                value={target_amount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                min="0"
                            />
                            {errors.target_amount && <p className="error-message">{errors.target_amount}</p>}
                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ backgroundColor: '#F15913', fontSize: '18px', fontWeight: '600' }}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GetStartedForm;