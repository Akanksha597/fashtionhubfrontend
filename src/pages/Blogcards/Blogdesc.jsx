import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "./Blogdesc.css";
import Footer from "../../components/footer/Footer";
import DOMPurify from "dompurify";

function BlogDescription() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axiosInstance.get(`/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setBlog(response.data.data);
        } else {
          setErrorMessage("Blog not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage("The requested blog does not exist.");
        } else {
          setErrorMessage("There was an error fetching the blog details.");
        }
        setLoading(false);
        console.error("Error fetching blog details:", error);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <>
      {blog && (
        <div className="blog-description-container">
 <div className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>
            <p className="blog-author">
              By <strong>{blog.author?.name}</strong> |{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          {blog.thumbnail && (
            <img
              className="blog-thumbnail"
              src={blog.thumbnail}
              alt={blog.title}
            />
          )}
         
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          ></div>

          <div className="back-to-blogs">
            <Link to="/Blogc" className="back-link">
              ← Back to Blogs
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default BlogDescription;
