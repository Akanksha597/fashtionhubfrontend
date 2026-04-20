import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import DOMPurify from 'dompurify'; 

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetching blog data from the server
    axiosInstance.get("/api/v1/blog", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (response.data && response.data.blogs) {
          setBlogs(response.data.blogs); // Set fetched blogs data
        } else {
          setErrorMessage("No blogs available.");
        }
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage("Error fetching blogs. Please try again later.");
        setLoading(false);
        console.error("Error fetching blog data:", error);
      });
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>; // Show loading message while fetching
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>; // Show error message if any
  }

  return (
    <Container style={{ maxWidth: '1500px', marginBottom: '30px' }}>
      <div>
        <h1 className="text-center mb-4 fw-bold text-dark" >BLOG</h1>
        <div>
          <div className="row">
            {blogs.map((blog, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex mt-4">
                <Link to={`/Blogc`} style={{ textDecoration: "none"  }}>
                  <div className="card h-100 w-100">
                    {blog.thumbnail && (
                      <img
                        src={blog.thumbnail}
                        className="card-img-top"
                    
                        alt={blog.title}
                      />
                    )}
                    <div className="card-body">
                      <h4 className="Blog-D">{blog.title}</h4>
                      {/* Use DOMPurify to sanitize content and render it safely */}
                      <p className="Blogd-p" 
                         dangerouslySetInnerHTML={{
                           __html: DOMPurify.sanitize(blog.content.substring(0, 98))
                         }}></p>
                      <div className="blog-btn">
                        <Link
                          to={`/Blogc`}
                          className="read-more"
                          style={{ textDecoration: "none" }}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Blog;
