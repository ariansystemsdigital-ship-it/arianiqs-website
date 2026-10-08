import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductFeatures.css";

const MAX_FEATURES = 20;
const MAX_APPLICATIONS = 20;
const MAX_INCLUDED_ITEMS = 20;
const MAX_EXCLUDED_ITEMS = 20;

const FEATURE_MAX_LENGTH = 200;
const APPLICATION_MAX_LENGTH = 250;
const ITEM_MAX_LENGTH = 250;

function ProductFeatures() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productIdentity,
    productInformation,
  } = location.state || {};

  const identity = productIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    subCategory: "PLC",
    productType: "New Product",
  };

  const information = productInformation || {};

  const [features, setFeatures] = useState([""]);
  const [applications, setApplications] = useState([""]);
  const [includedItems, setIncludedItems] = useState([""]);
  const [excludedItems, setExcludedItems] = useState([""]);

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  /* =========================================================
     COUNTS
  ========================================================= */

  const featureCount = useMemo(
    () => features.filter((item) => item.trim()).length,
    [features]
  );

  const applicationCount = useMemo(
    () => applications.filter((item) => item.trim()).length,
    [applications]
  );

  const includedCount = useMemo(
    () => includedItems.filter((item) => item.trim()).length,
    [includedItems]
  );

  const excludedCount = useMemo(
    () => excludedItems.filter((item) => item.trim()).length,
    [excludedItems]
  );

  /* =========================================================
     UPDATE ITEM
  ========================================================= */

  const updateItem = (setter, index, value, errorKey) => {
    setter((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    );

    setSaved(false);

    setErrors((current) => {
      const next = { ...current };

      if (value.trim()) {
        delete next[errorKey];
      }

      return next;
    });
  };

  /* =========================================================
     ADD ITEM
  ========================================================= */

  const addItem = (setter, maxItems) => {
    setter((current) => {
      if (current.length >= maxItems) {
        return current;
      }

      return [...current, ""];
    });

    setSaved(false);
  };

  /* =========================================================
     REMOVE ITEM
  ========================================================= */

  const removeItem = (setter, index) => {
    setter((current) => {
      if (current.length === 1) {
        return [""];
      }

      return current.filter(
        (_, itemIndex) => itemIndex !== index
      );
    });

    setSaved(false);
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const nextErrors = {};

    if (!features.some((item) => item.trim())) {
      nextErrors.features =
        "Add at least one product feature.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* =========================================================
     SAVE DRAFT
  ========================================================= */

  const saveDraft = () => {
    const draft = {
      productIdentity: identity,
      productInformation: information,
      features,
      applications,
      includedItems,
      excludedItems,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "arianiqs_product_features_draft",
      JSON.stringify(draft)
    );

    setSaved(true);
  };

  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    navigate("/products/basic-information", {
      state: {
        productIdentity: identity,
        productInformation: information,
      },
    });
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const handleNext = () => {
    if (!validateForm()) {
      return;
    }

    navigate("/products/technical-specifications", {
      state: {
        productIdentity: identity,
        productInformation: information,
        features,
        applications,
        includedItems,
        excludedItems,
      },
    });
  };

  /* =========================================================
     REPEATABLE SECTION
  ========================================================= */

  const renderRepeatableSection = ({
    title,
    description,
    label,
    items,
    setter,
    maxItems,
    maxLength,
    count,
    placeholder,
    errorKey,
    required = false,
  }) => {
    return (
      <section className="features-section">

        <div className="features-section-header">

          <div>
            <div className="features-section-label">
              {label}

              {required && (
                <span className="required-mark">
                  *
                </span>
              )}
            </div>

            <h2>{title}</h2>

            <p>{description}</p>
          </div>

          <div className="features-count">
            {count}/{maxItems}
          </div>

        </div>

        {items.map((item, index) => (
          <div
            className="v04-repeatable-row"
            key={`${label}-${index}`}
          >

            <div className="v04-row-number">
              {index + 1}
            </div>

            <div className="v04-row-input-wrapper">

              <input
                type="text"
                value={item}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={(event) =>
                  updateItem(
                    setter,
                    index,
                    event.target.value,
                    errorKey
                  )
                }
              />

              <div className="v04-character-count">
                {item.length}/{maxLength}
              </div>

            </div>

            <button
              type="button"
              className="v04-remove-button"
              onClick={() =>
                removeItem(setter, index)
              }
              disabled={items.length === 1}
              title={
                items.length === 1
                  ? "At least one row is required"
                  : "Remove"
              }
            >
              <Trash2 size={17} />
            </button>

          </div>
        ))}

        {errors[errorKey] && (
          <div className="v04-specification-error">
            {errors[errorKey]}
          </div>
        )}

        <div className="features-section-footer">

          <button
            type="button"
            className="add-repeatable-button"
            disabled={items.length >= maxItems}
            onClick={() =>
              addItem(setter, maxItems)
            }
          >
            <Plus size={16} />
            Add {label}
          </button>

          {items.length >= maxItems && (
            <span className="v04-limit-note">
              Maximum {maxItems} items allowed.
            </span>
          )}

        </div>

      </section>
    );
  };

  return (
    <div className="product-features-page">

      <div className="product-wizard-shell">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="product-wizard-header">

          <div className="product-step-label">
            PRODUCT CREATION
          </div>

          <div className="product-step-badge">
            <span className="product-step-badge-dot" />
            STEP 4 OF 10
          </div>

          <h1>
            Features & Applications
          </h1>

          <p>
            Define the product's key features, applications,
            included items, and exclusions.
          </p>

        </header>

        {/* ====================================================
            PRODUCT CREATION PROGRESS
        ==================================================== */}

        <div className="product-progress">

          {/* V-01 */}
          <div className="product-progress-step completed">
            <span className="progress-number">
              ✓
            </span>

            <span className="progress-label">
              Identity
            </span>
          </div>

          <div className="product-progress-line active" />

          {/* V-02 */}
          <div className="product-progress-step completed">
            <span className="progress-number">
              ✓
            </span>

            <span className="progress-label">
              Match Result
            </span>
          </div>

          <div className="product-progress-line active" />

          {/* V-03 */}
          <div className="product-progress-step completed">
            <span className="progress-number">
              ✓
            </span>

            <span className="progress-label">
              Basic Information
            </span>
          </div>

          <div className="product-progress-line active" />

          {/* V-04 */}
          <div className="product-progress-step active">
            <span className="progress-number">
              4
            </span>

            <span className="progress-label">
              Features & Applications
            </span>
          </div>

          <div className="product-progress-line" />

          {/* V-05 */}
          <div className="product-progress-step">
            <span className="progress-number">
              5
            </span>

            <span className="progress-label">
              Technical Specifications
            </span>
          </div>

          <div className="product-progress-line" />

          {/* V-06 */}
          <div className="product-progress-step">
            <span className="progress-number">
              6
            </span>

            <span className="progress-label">
              Images
            </span>
          </div>

          <div className="product-progress-line" />

          {/* V-07 */}
          <div className="product-progress-step">
            <span className="progress-number">
              7
            </span>

            <span className="progress-label">
              Documents
            </span>
          </div>

        </div>

        {/* ====================================================
            IDENTITY SUMMARY
        ==================================================== */}

        <div className="features-identity-card">

          <div>
            <span className="identity-card-label">
              PRODUCT
            </span>

            <strong>
              {information.productName ||
                information.name ||
                "New Product"}
            </strong>
          </div>

          <div>
            <span className="identity-card-label">
              BRAND
            </span>

            <strong>
              {identity.brand}
            </strong>
          </div>

          <div>
            <span className="identity-card-label">
              CATEGORY
            </span>

            <strong>
              {identity.category}
            </strong>
          </div>

          <div>
            <span className="identity-card-label">
              SUB-CATEGORY
            </span>

            <strong>
              {identity.subCategory}
            </strong>
          </div>

        </div>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="features-product-layout">

          <main className="features-product-card">

            {/* KEY FEATURES */}

            {renderRepeatableSection({
              title: "Key Product Features",

              description:
                "Highlight the most important capabilities and characteristics of this product.",

              label: "Feature",

              items: features,

              setter: setFeatures,

              maxItems: MAX_FEATURES,

              maxLength: FEATURE_MAX_LENGTH,

              count: featureCount,

              placeholder:
                "Example: High-speed CPU with integrated Ethernet communication",

              errorKey: "features",

              required: true,
            })}

            {/* APPLICATIONS */}

            {renderRepeatableSection({
              title: "Applications",

              description:
                "Describe where this product can be used in industrial or commercial environments.",

              label: "Application",

              items: applications,

              setter: setApplications,

              maxItems: MAX_APPLICATIONS,

              maxLength: APPLICATION_MAX_LENGTH,

              count: applicationCount,

              placeholder:
                "Example: Factory automation and machine control",

              errorKey: "applications",
            })}

            {/* INCLUDED ITEMS */}

            {renderRepeatableSection({
              title: "What's Included",

              description:
                "List the components, accessories, or items supplied with the product.",

              label: "Included Item",

              items: includedItems,

              setter: setIncludedItems,

              maxItems: MAX_INCLUDED_ITEMS,

              maxLength: ITEM_MAX_LENGTH,

              count: includedCount,

              placeholder:
                "Example: Mounting hardware",

              errorKey: "includedItems",
            })}

            {/* EXCLUDED ITEMS */}

            {renderRepeatableSection({
              title: "What's Not Included",

              description:
                "Mention accessories or services that customers must purchase separately.",

              label: "Excluded Item",

              items: excludedItems,

              setter: setExcludedItems,

              maxItems: MAX_EXCLUDED_ITEMS,

              maxLength: ITEM_MAX_LENGTH,

              count: excludedCount,

              placeholder:
                "Example: Programming cable",

              errorKey: "excludedItems",
            })}

          </main>

          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside className="features-product-sidebar">

            <div className="information-panel">

              <div className="information-panel-icon">
                i
              </div>

              <div>

                <h3>
                  Product Content
                </h3>

                <p>
                  Keep product information clear and
                  customer-focused. Avoid promotional claims
                  that cannot be verified.
                </p>

              </div>

            </div>

            <div className="customer-content-panel">

              <span className="customer-panel-label">
                CUSTOMER VIEW
              </span>

              <h3>
                What customers will understand
              </h3>

              <ul>

                <li>
                  What the product does
                </li>

                <li>
                  Where the product can be used
                </li>

                <li>
                  What comes with the product
                </li>

                <li>
                  What needs to be purchased separately
                </li>

              </ul>

            </div>

            <div className="technical-status-panel">

              <div className="status-panel-header">

                <span>
                  CONTENT STATUS
                </span>

                <span className="status-ready">
                  IN PROGRESS
                </span>

              </div>

              <div className="status-row">
                <span>Features</span>
                <strong>
                  {featureCount}
                </strong>
              </div>

              <div className="status-row">
                <span>Applications</span>
                <strong>
                  {applicationCount}
                </strong>
              </div>

              <div className="status-row">
                <span>Included</span>
                <strong>
                  {includedCount}
                </strong>
              </div>

              <div className="status-row">
                <span>Excluded</span>
                <strong>
                  {excludedCount}
                </strong>
              </div>

            </div>

            <div className="production-note">

              <strong>
                Production workflow
              </strong>

              <p>
                This information becomes part of the
                vendor product record and may be reviewed
                before publication.
              </p>

            </div>

          </aside>

        </div>

        {/* ====================================================
            ACTION BAR
        ==================================================== */}

        <div className="product-form-actions">

          <button
            type="button"
            className="secondary-action"
            onClick={handleBack}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="product-form-actions-right">

            <button
              type="button"
              className="draft-action"
              onClick={saveDraft}
            >
              <Save size={17} />

              {saved
                ? "Draft Saved"
                : "Save Draft"}
            </button>

            <button
              type="button"
              className="primary-action"
              onClick={handleNext}
            >
              Continue to Technical Specs
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductFeatures;