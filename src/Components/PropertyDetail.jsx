import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById, getReviewsByProperty, getImagesByProperty } from "../Api.js";
import "./PropertyDetail.css";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(null);

  const fetchPropertyDetail = async () => {
    try {
      const [propertyData, reviewsData, imagesData] = await Promise.all([
        getPropertyById(id),
        getReviewsByProperty(id),
        getImagesByProperty(id),
      ]);

      console.log("propertyData:", propertyData);
      console.log("reviewsData:", reviewsData);
      console.log("imagesData:", imagesData);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (hasErrored) {
    return <p>Error: {hasErrored.message}</p>;
  }
  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className="property-detail">
      <Link to="/" className="back-link">← Back to properties</Link>

      <h1>{property.name}</h1>
      <p className="property-detail-host">Hosted by {property.host_name}</p>

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

      {property.host && (
        <p className="property-detail-host">Hosted by {property.host}</p>
      )}

      {property.description && (
        <p className="property-detail-description">{property.description}</p>
      )}

      <section className="property-detail-reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.review_id} className="review-card">
              <p className="review-author">{review.guest_name}</p>
              {review.rating && (
                <p className="review-rating">Rating: {review.rating}/5</p>
              )}
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