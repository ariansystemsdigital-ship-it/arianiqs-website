import {
  CheckCircle2,
  FileText,
  ArrowLeft,
  PackageCheck,
  Clock3,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "./ProductSubmit.css";

function ProductSubmit() {
  const navigate = useNavigate();
  const location = useLocation();

  const workflow = location.state || {};

  const submissionCode =
    workflow.submissionCode || "ARQ-S-000884";

  const productName =
    workflow.productInformation?.productName ||
    workflow.productIdentity?.productName ||
    "Product Submission";

  const handleViewStatus = () => {
    navigate("/products/status", {
      state: {
        ...workflow,
        submissionCode,
        submissionStatus: "UNDER REVIEW",
      },
    });
  };

  const handleBackToReview = () => {
    navigate("/products/review", {
      state: workflow,
    });
  };

  return (
    <div className="product-submit-page">

      {/* Header */}
      <div className="submit-header">
        <div>
          <div className="submit-eyebrow">
            PRODUCT CREATION
          </div>

          <h1>
            Submission Received
          </h1>

          <p>
            Your product has been successfully submitted
            for Arianiqs review.
          </p>
        </div>

        <div className="submit-step">
          <span>STEP</span>
          <strong>11</strong>
          <small>OF 12</small>
        </div>
      </div>

      {/* Progress */}
      <div className="submit-progress">

        {[
          "Identity",
          "Match Result",
          "Basic Information",
          "Features",
          "Technical",
          "Images",
          "Documents",
          "Search & Filter",
          "Offer",
          "Review",
          "Submit",
          "Status",
        ].map((step, index) => {
          const stepNumber = index + 1;

          return (
            <div
              className={`submit-progress-step ${
                stepNumber < 11
                  ? "completed"
                  : stepNumber === 11
                  ? "active"
                  : ""
              }`}
              key={step}
            >
              <div className="submit-progress-number">
                {stepNumber < 11 ? (
                  <CheckCircle2 size={14} />
                ) : (
                  stepNumber
                )}
              </div>

              <span>{step}</span>

              {stepNumber < 12 && (
                <div className="submit-progress-line" />
              )}
            </div>
          );
        })}
      </div>

      {/* Main success card */}
      <div className="submit-success-card">

        <div className="submit-success-icon">
          <CheckCircle2 size={42} />
        </div>

        <div className="submit-success-content">

          <div className="submit-success-label">
            SUBMISSION RECEIVED
          </div>

          <h2>
            Product submitted successfully
          </h2>

          <p>
            Your product submission has been received by
            Arianiqs and is now waiting for review.
          </p>

          <div className="submission-code-box">
            <div>
              <span>Submission Code</span>
              <strong>{submissionCode}</strong>
            </div>

            <FileText size={22} />
          </div>

        </div>
      </div>

      {/* Status */}
      <div className="submit-status-card">

        <div className="status-icon">
          <Clock3 size={24} />
        </div>

        <div>
          <span className="status-label">
            CURRENT STATUS
          </span>

          <h3>
            UNDER REVIEW
          </h3>

          <p>
            Arianiqs review is required before the product
            can become available according to the applicable
            approval and marketplace rules.
          </p>
        </div>

      </div>

      {/* Product summary */}
      <div className="submit-section">

        <div className="section-heading">
          <div className="section-icon">
            <PackageCheck size={20} />
          </div>

          <div>
            <h2>Submitted Product</h2>
            <p>
              Product information associated with this submission.
            </p>
          </div>
        </div>

        <div className="product-summary-grid">

          <div className="summary-item">
            <span>PRODUCT</span>
            <strong>{productName}</strong>
          </div>

          <div className="summary-item">
            <span>SUBMISSION CODE</span>
            <strong>{submissionCode}</strong>
          </div>

          <div className="summary-item">
            <span>STATUS</span>
            <strong className="under-review">
              UNDER REVIEW
            </strong>
          </div>

          <div className="summary-item">
            <span>ARIANIQS PRODUCT CODE</span>
            <strong>
              Will be assigned after approval
            </strong>
          </div>

        </div>
      </div>

      {/* What happens next */}
      <div className="submit-section">

        <div className="section-heading">
          <div className="section-icon">
            <FileText size={20} />
          </div>

          <div>
            <h2>What happens next?</h2>
            <p>
              Your submission will move through the Arianiqs
              review process.
            </p>
          </div>
        </div>

        <div className="review-timeline">

          <div className="timeline-item">
            <div className="timeline-number">01</div>

            <div>
              <h3>
                Product Identity Review
              </h3>

              <p>
                Arianiqs reviews the product identity,
                manufacturer and MPN.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-number">02</div>

            <div>
              <h3>
                Product Information Review
              </h3>

              <p>
                Category, product type, technical information
                and submitted product details are reviewed.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-number">03</div>

            <div>
              <h3>
                Media & Document Review
              </h3>

              <p>
                Submitted images and supporting documents
                are checked.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-number">04</div>

            <div>
              <h3>
                Duplicate & Compliance Checks
              </h3>

              <p>
                Arianiqs checks duplicate products and
                unsupported product claims.
              </p>
            </div>
          </div>

          <div className="timeline-item last">
            <div className="timeline-number">05</div>

            <div>
              <h3>
                Review Decision
              </h3>

              <p>
                The submission may be approved, returned
                for changes, or rejected according to the
                review process.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Action bar */}
      <div className="submit-action-bar">

        <button
          type="button"
          className="submit-secondary-btn"
          onClick={handleBackToReview}
        >
          <ArrowLeft size={17} />
          Back to Review
        </button>

        <button
          type="button"
          className="submit-primary-btn"
          onClick={handleViewStatus}
        >
          View Submission Status
          <CheckCircle2 size={17} />
        </button>

      </div>

    </div>
  );
}

export default ProductSubmit;