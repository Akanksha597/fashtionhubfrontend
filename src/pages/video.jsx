import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Video.css";
import Footer from "../components/footer/Footer";
import axiosInstance from "../api/axiosInstance";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaPlayCircle, FaTrashAlt, FaYoutube } from "react-icons/fa";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  // Convert YouTube links to Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // Shorts URL
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Watch URL
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtu.be URL
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  // Fetch Videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/video");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Delete Video
  const deleteVideo = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/video/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <>
      <section className="fashion-video-page">
        {/* Hero */}
        <div className="fashion-banner text-center text-white">
          <Container>
            <FaYoutube className="youtube-icon mb-3" />
            <h1 className="fw-bold">Fashion Hub TV</h1>
            <p className="mb-2">Latest Trends • Style Tips • Runway Looks</p>

            <Badge bg="light" text="dark" className="px-3 py-2 fs-6">
              {videos.length} Videos Uploaded
            </Badge>
          </Container>
        </div>

        {/* Video List */}
        <Container className="py-4">
          <Row>
            {videos.map((video) => (
              <Col lg={6} md={12} className="mb-4" key={video._id}>
                <Card className="fashion-card border-0 shadow-lg h-100">
                  <div className="video-wrapper">
                    <iframe
                      src={getEmbedUrl(video.redirectLink)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <Card.Body>
                    <h5 className="fw-bold text-dark">{video.title}</h5>

                    <p className="text-muted small">
                      Discover trending styles and premium fashion inspiration.
                    </p>

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="danger"
                        onClick={() =>
                          window.open(video.redirectLink, "_blank")
                        }
                      >
                        <FaPlayCircle className="me-2" />
                        Watch
                      </Button>

                      <Button
                        variant="outline-dark"
                        onClick={() => deleteVideo(video._id)}
                      >
                        <FaTrashAlt className="me-2" />
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     
    </>
  );
};

export default Videos;