import React, { useState } from 'react';
// import './CommentForm.css';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [infoCheck, setInfoCheck] = useState(false); 
  const [errors, setErrors] = useState({});


  const validate = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!message) errors.message = "Message is required";
    if (!infoCheck) errors.infoCheck = "You must save your name";

    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validate()) {
 
      console.log("Form submitted:", { name, email, website, message });
 
      setName('');
      setEmail('');
      setWebsite('');
      setMessage('');
      setInfoCheck(false); 
      setErrors({});
    }
  };

  return (
    <div className="comment-container mt-5">
      <form className="comment-form" onSubmit={handleSubmit}>
        <div>
          <h3>Leave Comment</h3>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            className="form-control"
            id="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {errors.message && <small className="text-danger">{errors.message}</small>}
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="infoCheck"
            name="infoCheck"
            checked={infoCheck}
            onChange={(e) => setInfoCheck(e.target.checked)} 
          />
          <label className="form-check-label" htmlFor="infoCheck">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
          {errors.infoCheck && <small className="text-danger">{errors.infoCheck}</small>} 
        </div>
        <button type="submit" className=" comment mt-3">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
