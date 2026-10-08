import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Edit3,
  FileText,
  Image,
  Package,
  Search,
  ShieldCheck,
  Tag,
  Wrench,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import "./ProductReview.css";

const PRODUCT_WORKFLOW_STORAGE_KEY =
  "arianiqs_product_creation_workflow";

function ProductReview() {
  const navigate = useNavigate();
  const location = useLocation();

  /*
  ============================================================
  LOAD SAVED PRODUCT WORKFLOW
  ============================================================
  */

  const [storedWorkflow, setStoredWorkflow] = useState(() => {
    try {
      const saved = localStorage.getItem(
        PRODUCT_WORKFLOW_STORAGE_KEY
      );

      if (!saved) {
        return {};
      }

      const parsed = JSON.parse(saved);

      return parsed && typeof parsed === "object"
        ? parsed
        : {};
    } catch (error) {
      console.error(
        "Failed to load product workflow:",
        error
      );

      return {};
    }
  });

  /*
  ============================================================
  MERGE ROUTER DATA + STORED DATA
  ============================================================
  Latest navigation data takes priority.
  */

  const workflow = {
    ...storedWorkflow,
    ...(location.state || {}),
  };

  /*
  ============================================================
  SAVE COMPLETE WORKFLOW
  ============================================================
  */

  useEffect(() => {
    try {
      localStorage.setItem(
        PRODUCT_WORKFLOW_STORAGE_KEY,
        JSON.stringify({
          ...storedWorkflow,
          ...(location.state || {}),
          savedAt: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error(
        "Failed to save product workflow:",
        error
      );
    }
  }, [location.state]);

  const productIdentity = workflow.productIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    productType: "PLC",
    mpn: "6ES7-215-1AG40-0XB0",
  };

  const productInformation = workflow.productInformation || {
    productName: "Siemens SIMATIC S7-1200 CPU 1215C",
    shortDescription:
      "SIMATIC S7-1200 compact programmable logic controller.",
    fullDescription:
      "Industrial automation PLC designed for machine and process control applications.",
  };

  const features = workflow.features || {};

  const technicalSpecifications =
    workflow.technicalSpecifications || {};

  const images = workflow.images || {};

  const documents = workflow.documents || {};

  const searchFilterData =
    workflow.searchFilterData || {};

  const commercialOffer =
    workflow.commercialOffer || {};

  const getArray = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.items)) return value.items;
    return [];
  };

  const featureItems = getArray(features.features);
  const applicationItems = getArray(features.applications);

  const imageItems = getArray(images.additionalImages);

  const documentItems = getArray(documents.documents);

  const keywordItems = getArray(searchFilterData.keywords);

  const attributeItems = getArray(
    technicalSpecifications.attributes ||
      technicalSpecifications.specifications ||
      searchFilterData.attributes
  );

  const price = commercialOffer.sellingPrice
    ? `${commercialOffer.currency || "INR"} ${Number(
        commercialOffer.sellingPrice
      ).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "Not entered";

  const stock =
    commercialOffer.stockQuantity !== undefined &&
    commercialOffer.stockQuantity !== ""
      ? commercialOffer.stockQuantity
      : "Not entered";

  const moq =
    commercialOffer.moq !== undefined &&
    commercialOffer.moq !== ""
      ? commercialOffer.moq
      : "Not entered";

  const leadTime =
    commercialOffer.leadTimeValue !== undefined &&
    commercialOffer.leadTimeValue !== ""
      ? `${commercialOffer.leadTimeValue} ${
          commercialOffer.leadTimeUnit || "Days"
        }`
      : "Not entered";

  const warranty =
    commercialOffer.warrantyType === "No Warranty"
      ? "No Warranty"
      : commercialOffer.warrantyPeriod
        ? `${commercialOffer.warrantyPeriod} ${
            commercialOffer.warrantyUnit || "Months"
          }`
        : "Not entered";

  const editStep = (path) => {
    navigate(path, {
      state: workflow,
    });
  };

  const handleBack = () => {
    navigate("/products/offer", {
      state: workflow,
    });
  };

  const handleContinue = () => {
    /*
    Keep the complete workflow before moving
    to V-11.
    */

    try {
      localStorage.setItem(
        PRODUCT_WORKFLOW_STORAGE_KEY,
        JSON.stringify({
          ...workflow,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error(
        "Failed to save product workflow before submission:",
        error
      );
    }

    navigate("/products/submit", {
      state: workflow,
    });
  };

  return (
    <div className="product-review-page">
      {/* HEADER */}
      <section className="review-header">
        <div>
          <div className="review-eyebrow">
            PRODUCT CREATION
          </div>

          <h1>Review & Preview</h1>

          <p>
            Review all product information before submitting
            it to Arianiqs.
          </p>
        </div>

        <div className="review-step-badge">
          STEP 10 OF 10
        </div>
      </section>

      {/* PROGRESS */}
      <div className="review-progress">
        {[
          "Identity",
          "Match Result",
          "Basic Information",
          "Features & Applications",
          "Technical Specifications",
          "Images",
          "Documents",
          "Search & Filter",
          "Commercial Offer",
          "Review & Preview",
        ].map((label, index) => {
          const completed = index < 9;
          const active = index === 9;

          return (
            <div
              className="review-progress-group"
              key={label}
            >
              <div
                className={[
                  "review-progress-step",
                  completed ? "completed" : "",
                  active ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="progress-number">
                  {completed ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    index + 1
                  )}
                </span>

                <span className="progress-label">
                  {label}
                </span>
              </div>

              {index < 9 && (
                <span className="review-progress-line active" />
              )}
            </div>
          );
        })}
      </div>

      {/* SUBMISSION STATUS */}
      <section className="review-ready-banner">
        <div className="ready-icon">
          <CheckCircle2 size={23} />
        </div>

        <div>
          <strong>Ready for final review</strong>

          <p>
            Your product information has been collected.
            Review the details below before proceeding to
            submission.
          </p>
        </div>
      </section>

      {/* PRODUCT IDENTITY */}
      <section className="review-card">
        <div className="review-card-header">
          <div className="review-card-icon">
            <Tag size={18} />
          </div>

          <div>
            <h2>Product Identity</h2>
            <p>
              Exact product identification and duplicate
              prevention information.
            </p>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() =>
              editStep("/products/add")
            }
          >
            <Edit3 size={14} />
            Edit
          </button>
        </div>

        <div className="identity-preview">
          <div>
            <span>PRODUCT NAME</span>
            <strong>
              {productInformation.productName ||
                "Product name not entered"}
            </strong>
          </div>

          <div>
            <span>BRAND</span>
            <strong>
              {productIdentity.brand || "—"}
            </strong>
          </div>

          <div>
            <span>CATEGORY</span>
            <strong>
              {productIdentity.category || "—"}
            </strong>
          </div>

          <div>
            <span>PRODUCT TYPE</span>
            <strong>
              {productIdentity.productType || "—"}
            </strong>
          </div>

          <div>
            <span>MPN / PART NUMBER</span>
            <strong>
              {productIdentity.mpn || "—"}
            </strong>
          </div>

          <div>
            <span>ARIANIQS PRODUCT CODE</span>
            <strong className="muted-value">
              Will be assigned after approval
            </strong>
          </div>
        </div>
      </section>

      {/* BASIC INFORMATION */}
      <section className="review-card">
        <div className="review-card-header">
          <div className="review-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Basic Product Information</h2>
            <p>
              Customer-facing product description and
              information.
            </p>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() =>
              editStep(
                "/products/basic-information"
              )
            }
          >
            <Edit3 size={14} />
            Edit
          </button>
        </div>

        <div className="review-text-section">
          <span>SHORT DESCRIPTION</span>

          <p>
            {productInformation.shortDescription ||
              "No short description entered."}
          </p>
        </div>

        <div className="review-text-section">
          <span>FULL DESCRIPTION</span>

          <p>
            {productInformation.fullDescription ||
              "No full description entered."}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="review-card">
        <div className="review-card-header">
          <div className="review-card-icon">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h2>Features & Applications</h2>
            <p>
              Product features, applications and included
              information.
            </p>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() =>
              editStep("/products/features")
            }
          >
            <Edit3 size={14} />
            Edit
          </button>
        </div>

        <div className="review-two-column">
          <div>
            <h3>Key Features</h3>

            {featureItems.length > 0 ? (
              <ul className="review-list">
                {featureItems.map((item, index) => (
                  <li key={index}>
                    <CheckCircle2 size={14} />
                    {typeof item === "string"
                      ? item
                      : item.name ||
                        item.value ||
                        "Feature"}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-review">
                Features entered in the previous step.
              </div>
            )}
          </div>

          <div>
            <h3>Applications</h3>

            {applicationItems.length > 0 ? (
              <ul className="review-list">
                {applicationItems.map((item, index) => (
                  <li key={index}>
                    <CheckCircle2 size={14} />
                    {typeof item === "string"
                      ? item
                      : item.name ||
                        item.value ||
                        "Application"}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-review">
                Applications entered in the previous step.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TECHNICAL */}
      <section className="review-card">
        <div className="review-card-header">
          <div className="review-card-icon">
            <Wrench size={18} />
          </div>

          <div>
            <h2>Technical Specifications</h2>
            <p>
              Technical attributes associated with the
              master product.
            </p>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() =>
              editStep(
                "/products/technical-specifications"
              )
            }
          >
            <Edit3 size={14} />
            Edit
          </button>
        </div>

        {attributeItems.length > 0 ? (
          <div className="specification-table">
            {attributeItems.map((item, index) => {
              const name =
                item.name ||
                item.label ||
                item.attribute ||
                `Specification ${index + 1}`;

              const value =
                item.value ||
                item.selectedValue ||
                item.values ||
                "—";

              return (
                <div
                  className="specification-row"
                  key={index}
                >
                  <span>{name}</span>

                  <strong>
                    {Array.isArray(value)
                      ? value.join(", ")
                      : value}
                  </strong>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-review">
            Technical specifications entered in V-05.
          </div>
        )}
      </section>

      {/* IMAGES + DOCUMENTS */}
      <div className="review-grid-two">
        <section className="review-card">
          <div className="review-card-header">
            <div className="review-card-icon">
              <Image size={18} />
            </div>

            <div>
              <h2>Product Images</h2>
              <p>
                Visual evidence attached to the product.
              </p>
            </div>

            <button
              type="button"
              className="edit-button"
              onClick={() =>
                editStep("/products/images")
              }
            >
              <Edit3 size={14} />
              Edit
            </button>
          </div>

          <div className="media-summary">
            <div className="media-count">
              <strong>
                {images.primaryImage ? 1 : 0}
              </strong>
              <span>Primary Image</span>
            </div>

            <div className="media-count">
              <strong>
                {imageItems.length}
              </strong>
              <span>Additional Images</span>
            </div>
          </div>

          <div className="media-status">
            <CheckCircle2 size={15} />
            Required image information reviewed
          </div>
        </section>

        <section className="review-card">
          <div className="review-card-header">
            <div className="review-card-icon">
              <FileText size={18} />
            </div>

            <div>
              <h2>Product Documents</h2>
              <p>
                Technical documents attached to the product.
              </p>
            </div>

            <button
              type="button"
              className="edit-button"
              onClick={() =>
                editStep("/products/documents")
              }
            >
              <Edit3 size={14} />
              Edit
            </button>
          </div>

          <div className="document-summary">
            <strong>{documentItems.length}</strong>
            <span>Documents added</span>
          </div>

          <div className="media-status">
            <CheckCircle2 size={15} />
            Document information reviewed
          </div>
        </section>
      </div>

      {/* SEARCH FILTER */}
      <section className="review-card">
        <div className="review-card-header">
          <div className="review-card-icon">
            <Search size={18} />
          </div>

          <div>
            <h2>Search & Filter Data</h2>
            <p>
              Arianiqs-controlled filters and product search
              keywords.
            </p>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() =>
              editStep(
                "/products/search-filter"
              )
            }
          >
            <Edit3 size={14} />
            Edit
          </button>
        </div>

        <div className="filter-review">
          <div>
            <span>Brand</span>
            <strong>
              {productIdentity.brand || "—"}
            </strong>
          </div>

          <div>
            <span>Category</span>
            <strong>
              {productIdentity.category || "—"}
            </strong>
          </div>

          <div>
            <span>Product Type</span>
            <strong>
              {productIdentity.productType || "—"}
            </strong>
          </div>
        </div>

        {keywordItems.length > 0 && (
          <div className="keyword-review">
            <span>SEARCH KEYWORDS</span>

            <div className="keyword-list">
              {keywordItems.map((keyword, index) => (
                <span key={index}>
                  {typeof keyword === "string"
                    ? keyword
                    : keyword.value ||
                      keyword.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* COMMERCIAL OFFER */}
      <section className="review-card commercial-review-card">
        <div className="review-card-header">
          <div className="review-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Vendor Commercial Offer</h2>
            <p>
              Commercial values belonging to this vendor
              offer.
            </p>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() =>
              editStep("/products/offer")
            }
          >
            <Edit3 size={14} />
            Edit
          </button>
        </div>

        <div className="commercial-review-grid">
          <div>
            <span>VENDOR SKU</span>
            <strong>
              {commercialOffer.vendorSku ||
                "Not provided"}
            </strong>
          </div>

          <div className="price-review">
            <span>SELLING PRICE</span>
            <strong>{price}</strong>
          </div>

          <div>
            <span>STOCK QUANTITY</span>
            <strong>{stock}</strong>
          </div>

          <div>
            <span>MOQ</span>
            <strong>{moq}</strong>
          </div>

          <div>
            <span>LEAD TIME</span>
            <strong>{leadTime}</strong>
          </div>

          <div>
            <span>WARRANTY</span>
            <strong>{warranty}</strong>
          </div>

          <div>
            <span>RETURN ELIGIBLE</span>
            <strong>
              {commercialOffer.returnEligible ||
                "Not specified"}
            </strong>
          </div>
        </div>

        {commercialOffer.offerNotes && (
          <div className="offer-notes-review">
            <span>OFFER NOTES</span>

            <p>{commercialOffer.offerNotes}</p>
          </div>
        )}
      </section>

      {/* FINAL CHECKLIST */}
      <section className="final-checklist">
        <div className="checklist-header">
          <CheckCircle2 size={21} />

          <div>
            <h2>Submission Checklist</h2>
            <p>
              Please confirm that the information above is
              correct before continuing.
            </p>
          </div>
        </div>

        <div className="checklist-items">
          <div>
            <CheckCircle2 size={16} />
            Product Identity Complete
          </div>

          <div>
            <CheckCircle2 size={16} />
            Basic Information Complete
          </div>

          <div>
            <CheckCircle2 size={16} />
            Technical Specifications Complete
          </div>

          <div>
            <CheckCircle2 size={16} />
            Required Images Complete
          </div>

          <div>
            <CheckCircle2 size={16} />
            Required Documents Complete
          </div>

          <div>
            <CheckCircle2 size={16} />
            Search & Filter Data Complete
          </div>

          <div>
            <CheckCircle2 size={16} />
            Commercial Offer Complete
          </div>
        </div>
      </section>

      {/* ACTION BAR */}
      <div className="review-action-bar">
        <button
          type="button"
          className="review-button secondary"
          onClick={handleBack}
        >
          <ArrowLeft size={17} />
          Back to Commercial Offer
        </button>

        <div className="review-action-right">
          <span className="review-ready-text">
            <CheckCircle2 size={15} />
            Ready for submission
          </span>

          <button
            type="button"
            className="review-button primary"
            onClick={handleContinue}
          >
            Continue to Submit
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductReview;