import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import './Blogcards.css';
import Blogi from "../../assets/image/Blogbanner.png";
import DOMPurify from "dompurify";  // Import DOMPurify for sanitizing

function BlogCard() {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/blog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.blogs && response.data.blogs.length > 0) {
          setBlogs(response.data.blogs);
        } else {
          setErrorMessage("No blogs found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("You are not logged in! Please log in to access this content.");
        } else {
          setErrorMessage("There was an error fetching the blog data.");
        }
        setLoading(false);
        console.error("Error fetching blog data:", error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <>
      <div className="container-ouvercompay" style={{ backgroundImage: `url(${Blogi})` }}>
        <div className="text-center mt-5">
        
        </div>
      </div>

      <div className="container cards-custm mt-5 mb-5">
        <div className="row">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className="col-lg-6 col-md-6 col-sm-12 mt-4" key={blog._id}>
                <Link to={`/BlogD/${blog._id}`} style={{ textDecoration: "none" }}>
                  <div className="card exper-card shadow rounded h-100 w-100" style={{ padding: "10px" }}>
                    {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} />}
                    <div className="card-body">
                      <h6 className="Blog-D">{blog.title}</h6>
                      <p className="blog-author">
              By <strong>{blog.author?.name}</strong> |{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
                      <p className="Blogd-p">
                        {/* Render sanitized content using dangerouslySetInnerHTML */}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog.content.substring(0, 100)),  // Sanitized first 100 characters
                          }}
                        />
                 
                      </p>
                      <div className="blog-btn">
                        <Link to={`/BlogD/${blog._id}`} className="read-more" style={{ textDecoration: "none" }}>
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>No blogs available</div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BlogCard;
