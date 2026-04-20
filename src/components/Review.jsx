import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsForProduct, createReview } from '../features/review/review';
import './Review.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewPage = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const tempUserData = localStorage.getItem('user');
  const finalUserData = JSON.parse(tempUserData);

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsForProduct(productId));
    }
  }, [dispatch, productId]);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!finalUserData || !finalUserData._id) {
      setErrorMessage('User not logged in!');
      setLoading(false);
      return;
    }

    try {
      const reviewData = {
        user: finalUserData._id,
        productId,
        rating: formData.rating,
        description: formData.review,
      };
      await dispatch(createReview(reviewData));
      alert('Review added successfully!');
      setShowForm(false);
      setFormData({ rating: 0, review: '' });
      dispatch(fetchReviewsForProduct(productId));
    } catch (error) {
      setErrorMessage('Error submitting review. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (selectedRating, isEditable = false) => {
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa${i < selectedRating ? 's' : 'r'} fa-star text-warning`}
            onClick={() => isEditable && handleRatingChange(i + 1)}
            style={{ cursor: isEditable ? 'pointer' : 'default' }}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h2>Customer Reviews</h2>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      <button className="btn btn-warning mt-4" onClick={toggleFormVisibility}>
        Write a Product Review
      </button>

      {showForm && (
        <div className="mt-4">
          <h4>Write Your Review</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rating</label>
              {renderStars(formData.rating, true)}
            </div>
            <div className="form-group">
              <label htmlFor="review">Review</label>
              <textarea
                className="form-control"
                id="review"
                rows="3"
                placeholder="Write your review here"
                value={formData.review}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning">
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      <div className="reviews mt-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="review-item border-bottom py-3" key={review._id}>
              <div className="text-warning small-stars">
                {renderStars(review.rating)}
              </div>
              <div className="review-content ml-3">
                <h6>{review.user ? review.user.name : 'Anonymous'}</h6>
                <p className="text-muted">Reviewed On {new Date(review.createdAt).toLocaleDateString()}</p>
                <p>{review.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
