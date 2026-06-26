import "./SkeletonPropertyDetail.css";

export default function SkeletonPropertyDetail() {
  return (
    <div className="skeleton-detail">
      <div className="skeleton-back" />

      <div className="skeleton-title" />
      <div className="skeleton-location" />
      <div className="skeleton-host" />

      <div className="skeleton-images">
        <div className="skeleton-image" />
        <div className="skeleton-image" />
        <div className="skeleton-image" />
      </div>

      <div className="skeleton-price" />
      <div className="skeleton-description-line" />
      <div className="skeleton-description-line short" />
      <div className="skeleton-description-line medium" />

      <div className="skeleton-reviews-title" />
      <div className="skeleton-review-card" />
      <div className="skeleton-review-card" />
    </div>
  );
}
