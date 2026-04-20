import React, { useState, useEffect } from 'react';
import Footer from '../footer/Footer';
import './Help.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../api/axiosInstance';

const ContactForm = () => {
    const tempUserData = localStorage.getItem('user');
    const finalUserData = JSON.parse(tempUserData);

    const [formData, setFormData] = useState({
        user_id: finalUserData?._id ? finalUserData?._id : '',
        name: finalUserData?.name ? finalUserData?.name : '',
        email: finalUserData?.email ? finalUserData?.email : '',
        mobile: finalUserData?.mobile ? finalUserData?.mobile : '',
        title: '',
        description: '',
        issue_msg: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (finalUserData) {
            setFormData({
                user_id: finalUserData._id ? finalUserData._id : '',
                name: finalUserData.name ? finalUserData.name : '',
                email: finalUserData.email ? finalUserData.email : '',
                mobile: finalUserData.mobile ? finalUserData.mobile : ''
            })
        }
        if (successMessage) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [successMessage]);
    const validate = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.name.trim()) {
            formErrors.name = "Name is required";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            formErrors.email = "Email is required";
            valid = false;
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
            valid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!formData.mobile) {
            formErrors.mobile = "Phone number is required";
            valid = false;
        } else if (!phoneRegex.test(formData.mobile)) {
            formErrors.mobile = "Phone number must be 10 digits";
            valid = false;
        }

        if (!formData.title.trim()) {
            formErrors.title = "Title is required";
            valid = false;
        }

        if (!formData.description.trim()) {
            formErrors.description = "Description cannot be empty";
            valid = false;
        }

        if (!formData.issue_msg.trim()) {
            formErrors.issue_msg = "Issue message cannot be empty";
            valid = false;
        }

        setErrors(formErrors);
        setTimeout(() => setErrors({}), 5000);
        return valid;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const dbCart = [
                {
                    user_id: formData.user_id,
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                },
            ];

            const response = await axiosInstance.post(
                '/api/v1/queries/createquery',
                {
                    dbCart,
                    title: formData.title,
                    description: formData.description,
                    issue_msg: formData.issue_msg,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.data) {
                toast.success('Query submitted successfully!');
                setFormData({
                    user_id: finalUserData?._id || '',
                    name: '',
                    email: '',
                    mobile: '',
                    title: '',
                    description: '',
                    issue_msg: '',
                });
            }
        } catch (error) {
            toast.error('Failed to submit query. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log('formdata ::::', formData)
    return (
        <>
            <div className={`contact-section ${successMessage ? 'disabled' : ''}`}>
                <div className="container">
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="info-block">
                                <div className="icon-text">
                                </div>
                              
                            </div>
                            <div className="info-block">
                                <div className="icon-text">
                                    <i className="fa fa-envelope"></i>
                                    <h3>Email</h3>
                                </div>
                                <p>info@bestagrolife.com</p>
                                <p>wecare@bestagrolife.com (for inquiries and sales purposes)</p>
                            </div>
                            <div className="info-block">
                                <div className="icon-text">
                                    <i className="fa fa-map-marker"></i>
                                    <h3>Office Address</h3>
                                </div>
                                <p>Akluj Ghodebazar Market Yard Gala No.45 Taluka Malshiras District Solapur</p>
                            </div>
                        </div>

                        <div className="contact-form">
                            <h3>If you have any questions, please do not hesitate to send us a message</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="Enter Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="error fade-in">{errors.name}</p>}

                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="error fade-in">{errors.email}</p>}

                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-input"
                                    placeholder="Enter Phone No"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                                {errors.phone && <p className="error fade-in">{errors.phone}</p>}

                                <input
                                    type="text"
                                    name="title"
                                    className="form-input"
                                    placeholder="Enter Query Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && <p className="error fade-in">{errors.title}</p>}

                                <textarea
                                    name="description"
                                    className="form-input"
                                    placeholder="Enter Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && <p className="error fade-in">{errors.description}</p>}

                                <textarea
                                    name="issue_msg"
                                    className="form-input"
                                    placeholder="Enter Issue Message"
                                    value={formData.issue_msg}
                                    onChange={handleChange}
                                />
                                {errors.issue_msg && <p className="error fade-in">{errors.issue_msg}</p>}

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>



    );
};

export default ContactForm;
