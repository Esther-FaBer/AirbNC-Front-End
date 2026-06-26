import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById, getReviewsByProperty, getImagesByProperty, postReview } from "../Api.js";
import "./PropertyDetail.css";
import SkeletonPropertyDetail from "./SkeletonPropertyDetail.jsx";

// Jane Doe is the logged in user — user_id: 1
const LOGGED_IN_USER = { user_id: 1, name: "Jane Doe" };

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(null);

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchPropertyDetail = async () => {
    try {
      const [propertyData, reviewsData, imagesData] = await Promise.all([
        getPropertyById(id),
        getReviewsByProperty(id),
        getImagesByProperty(id),
      ]);

      setProperty(propertyData.property || propertyData);
      setReviews(reviewsData.reviews || reviewsData);
      setImages(imagesData.images || imagesData);
    } catch (err) {
      setHasErrored(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetail();
  }, [id]);

  const handlePostReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const { review } = await postReview(id, LOGGED_IN_USER.user_id, rating, comment);
      setReviews((prev) => [
        {
          ...review,
          guest: LOGGED_IN_USER.name,
        },
        ...prev,
      ]);
      setComment("");
      setRating(5);
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError("Failed to post review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <SkeletonPropertyDetail />;
  if (hasErrored) return <p>Error: {hasErrored.message}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-detail">
      <Link to="/" className="back-link">← Back to properties</Link>

      <h1>{property.name}</h1>

      <p className="property-detail-location">{property.location}</p>

      {property.host_name && (
        <p className="property-detail-host">Hosted by {property.host_name}</p>
      )}

      {images.length > 0 && (
        <div className="property-detail-images">
          {images.map((image) => (
            <img
              key={image.image_id}
              src={image.image_url}
              alt={image.alt_text}
              className="property-detail-image"
            />
          ))}
        </div>
      )}

      <p className="property-detail-price">
        £<span>{property.price_per_night}</span>/night
      </p>

      {property.description && (
        <p className="property-detail-description">{property.description}</p>
      )}

      {/* ── Post a review form ── */}
      <section className="post-review-section">
        <h2>Leave a Review</h2>
        <p className="posting-as">Posting as <strong>{LOGGED_IN_USER.name}</strong></p>

        <form className="review-form" onSubmit={handlePostReview}>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="form-select"
            >
              <option value={5}>⭐⭐⭐⭐⭐ — 5 stars</option>
              <option value={4}>⭐⭐⭐⭐ — 4 stars</option>
              <option value={3}>⭐⭐⭐ — 3 stars</option>
              <option value={2}>⭐⭐ — 2 stars</option>
              <option value={1}>⭐ — 1 star</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          {submitError && <p className="form-error">{submitError}</p>}
          {submitSuccess && <p className="form-success">Review posted successfully!</p>}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Review"}
          </button>
        </form>
      </section>

      {/* ── Reviews list ── */}
      <section className="property-detail-reviews">
        <h2>Reviews {reviews.length > 0 && `(${reviews.length})`}</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet — be the first!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.review_id} className="review-card">
              <div className="review-header">
                <p className="review-author">{review.guest}</p>
                {review.rating && (
                  <p className="review-rating">{"⭐".repeat(review.rating)}</p>
                )}
              </div>
              {review.comment && (
                <p className="review-comment">{review.comment}</p>
              )}
              {review.created_at && (
                <p className="review-date">
                  {new Date(review.created_at).toLocaleDateString("en-GB")}
                </p>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}