import {
  CheckCircle2,
  Clock3,
  FileText,
  Package,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "./ProductStatus.css";

function ProductStatus() {
  const navigate = useNavigate();
  const location = useLocation();

  const workflow = location.state || {};

  const submissionCode =
    workflow.submissionCode || "ARQ-S-000884";

  const productName =
    workflow.productInformation?.productName ||
    workflow.productIdentity?.productName ||
    "Siemens SIMATIC S7-1200 CPU 1215C";

  const productIdentity =
    workflow.productIdentity || {};

  const productInformation =
    workflow.productInformation || {};

  const commercialOffer =
    workflow.commercialOffer || {};

  const handleBackToSubmit = () => {
    navigate("/products/submit", {
      state: workflow,
    });
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="product-status-page">

      {/* =========================================
          HEADER
          ========================================= */}

      <div className="status-page-header">

        <div>
          <div className="status-eyebrow">
            PRODUCT CREATION
          </div>

          <h1>
            Submission Status
          </h1>

          <p>
            Track the current review status of your
            product submission.
          </p>
        </div>

        <div className="status-step">
          <span>STEP</span>
          <strong>12</strong>
          <small>OF 12</small>
        </div>

      </div>

      {/* =========================================
          PROGRESS
          ========================================= */}

      <div className="status-progress">

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
              className={`status-progress-step ${
                stepNumber <= 11
                  ? "completed"
                  : "active"
              }`}
              key={step}
            >

              <div className="status-progress-number">

                {stepNumber <= 11 ? (
                  <CheckCircle2 size={14} />
                ) : (
                  stepNumber
                )}

              </div>

              <span>
                {step}
              </span>

              {stepNumber < 12 && (
                <div className="status-progress-line" />
              )}

            </div>
          );
        })}

      </div>

      {/* =========================================
          MAIN STATUS CARD
          ========================================= */}

      <div className="current-status-card">

        <div className="current-status-icon">
          <Clock3 size={42} />
        </div>

        <div className="current-status-content">

          <span className="current-status-label">
            CURRENT SUBMISSION STATUS
          </span>

          <h2>
            UNDER REVIEW
          </h2>

          <p>
            Your product submission has been received
            and is currently in the Arianiqs review process.
          </p>

          <div className="status-code">

            <div>
              <span>SUBMISSION CODE</span>
              <strong>
                {submissionCode}
              </strong>
            </div>

            <FileText size={20} />

          </div>

        </div>

      </div>

      {/* =========================================
          SUBMISSION INFORMATION
          ========================================= */}

      <div className="status-card">

        <div className="status-card-heading">

          <div className="status-card-icon">
            <Package size={20} />
          </div>

          <div>
            <h2>
              Submission Information
            </h2>

            <p>
              Details associated with this product submission.
            </p>
          </div>

        </div>

        <div className="status-info-grid">

          <div className="status-info-item">
            <span>PRODUCT</span>

            <strong>
              {productName}
            </strong>
          </div>

          <div className="status-info-item">
            <span>BRAND</span>

            <strong>
              {productIdentity.brand || "Siemens"}
            </strong>
          </div>

          <div className="status-info-item">
            <span>CATEGORY</span>

            <strong>
              {productIdentity.category ||
                "Industrial Automation"}
            </strong>
          </div>

          <div className="status-info-item">
            <span>PRODUCT TYPE</span>

            <strong>
              {productIdentity.productType || "PLC"}
            </strong>
          </div>

          <div className="status-info-item">
            <span>MPN / PART NUMBER</span>

            <strong>
              {productIdentity.mpn ||
                "6ES7-215-1AG40-0XB0"}
            </strong>
          </div>

          <div className="status-info-item">
            <span>ARIANIQS PRODUCT CODE</span>

            <strong>
              Will be assigned after approval
            </strong>
          </div>

        </div>

      </div>

      {/* =========================================
          REVIEW PROGRESS
          ========================================= */}

      <div className="status-card">

        <div className="status-card-heading">

          <div className="status-card-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2>
              Review Progress
            </h2>

            <p>
              Current stage of the Arianiqs review process.
            </p>
          </div>

        </div>

        <div className="review-status-list">

          <div className="review-status-item completed">

            <div className="review-status-marker">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <h3>
                Submission Received
              </h3>

              <p>
                Product submission has been successfully received.
              </p>
            </div>

            <span>
              COMPLETED
            </span>

          </div>

          <div className="review-status-item active">

            <div className="review-status-marker">
              <Clock3 size={17} />
            </div>

            <div>
              <h3>
                Arianiqs Review
              </h3>

              <p>
                Product identity, product information,
                technical details, media and documents
                are being reviewed.
              </p>
            </div>

            <span>
              IN PROGRESS
            </span>

          </div>

          <div className="review-status-item">

            <div className="review-status-marker">
              <span>3</span>
            </div>

            <div>
              <h3>
                Review Decision
              </h3>

              <p>
                The submission will receive the applicable
                review decision.
              </p>
            </div>

            <span>
              PENDING
            </span>

          </div>

          <div className="review-status-item">

            <div className="review-status-marker">
              <span>4</span>
            </div>

            <div>
              <h3>
                Product Availability
              </h3>

              <p>
                Marketplace availability follows the applicable
                Arianiqs approval and publication process.
              </p>
            </div>

            <span>
              PENDING
            </span>

          </div>

        </div>

      </div>

      {/* =========================================
          COMMERCIAL SUMMARY
          ========================================= */}

      <div className="status-card">

        <div className="status-card-heading">

          <div className="status-card-icon">
            <FileText size={20} />
          </div>

          <div>
            <h2>
              Commercial Offer
            </h2>

            <p>
              Vendor offer information associated with this submission.
            </p>
          </div>

        </div>

        <div className="commercial-summary">

          <div>
            <span>VENDOR SKU</span>
            <strong>
              {commercialOffer.vendorSku || "—"}
            </strong>
          </div>

          <div>
            <span>SELLING PRICE</span>
            <strong>
              {commercialOffer.sellingPrice
                ? `${commercialOffer.currency || "INR"} ${commercialOffer.sellingPrice}`
                : "—"}
            </strong>
          </div>

          <div>
            <span>STOCK</span>
            <strong>
              {commercialOffer.stockQuantity || "—"}
            </strong>
          </div>

          <div>
            <span>MOQ</span>
            <strong>
              {commercialOffer.moq || "—"}
            </strong>
          </div>

        </div>

      </div>

      {/* =========================================
          INFORMATION NOTICE
          ========================================= */}

      <div className="status-notice">

        <RefreshCw size={19} />

        <div>
          <strong>
            Review status updates
          </strong>

          <p>
            This status represents the current stage shown
            for this submission. Further review actions or
            requests will be reflected in the submission status.
          </p>
        </div>

      </div>

      {/* =========================================
          ACTION BAR
          ========================================= */}

      <div className="status-action-bar">

        <button
          type="button"
          className="status-secondary-btn"
          onClick={handleBackToSubmit}
        >
          <ArrowLeft size={17} />
          Back to Submission
        </button>

        <button
          type="button"
          className="status-primary-btn"
          onClick={handleBackToDashboard}
        >
          Go to Dashboard
          <CheckCircle2 size={17} />
        </button>

      </div>

    </div>
  );
}

export default ProductStatus;