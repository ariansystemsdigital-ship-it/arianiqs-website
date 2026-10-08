import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";



const MAX_SPECIFICATIONS = 40;

const SPEC_NAME_MAX_LENGTH = 120;
const SPEC_VALUE_MAX_LENGTH = 250;
const SPEC_UNIT_MAX_LENGTH = 40;

const DEFAULT_SPECIFICATION = {
  name: "",
  value: "",
  unit: "",
};

function TechnicalSpecifications() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     DATA FROM PREVIOUS STEPS
  ========================================================= */

  const incomingIdentity = location.state?.productIdentity;

  const incomingProductInformation =
    location.state?.productInformation;

  const incomingFeatures =
    location.state?.features || [""];

  const incomingApplications =
    location.state?.applications || [""];

  const incomingIncludedItems =
    location.state?.includedItems || [""];

  const incomingExcludedItems =
    location.state?.excludedItems || [""];

  /* =========================================================
     FALLBACK PRODUCT DATA
  ========================================================= */

  const productIdentity = incomingIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    productType: "PLC",
    mpn: "New Product",
  };

  const productInformation =
    incomingProductInformation || {
      productName: "",
      shortDescription: "",
      fullDescription: "",
      productFamily: "",
      countryOfOrigin: "",
    };

  /* =========================================================
     SPECIFICATION STATE
  ========================================================= */

  const [specifications, setSpecifications] = useState([
    { ...DEFAULT_SPECIFICATION },
  ]);

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  /* =========================================================
     SPECIFICATION COUNT
  ========================================================= */

  const specificationCount = useMemo(() => {
    return specifications.filter(
      (specification) =>
        specification.name.trim() ||
        specification.value.trim() ||
        specification.unit.trim()
    ).length;
  }, [specifications]);

  /* =========================================================
     COMPLETED SPECIFICATION COUNT
  ========================================================= */

  const completedSpecificationCount = useMemo(() => {
    return specifications.filter(
      (specification) =>
        specification.name.trim() &&
        specification.value.trim()
    ).length;
  }, [specifications]);

  /* =========================================================
     UPDATE SPECIFICATION
  ========================================================= */

  const updateSpecification = (
    index,
    field,
    value,
    maxLength
  ) => {
    const limitedValue = value.slice(0, maxLength);

    setSpecifications((current) =>
      current.map((specification, specificationIndex) =>
        specificationIndex === index
          ? {
              ...specification,
              [field]: limitedValue,
            }
          : specification
      )
    );

    setSaved(false);

    setErrors((current) => {
      const nextErrors = { ...current };

      delete nextErrors[`specification-${index}`];
      delete nextErrors.general;

      return nextErrors;
    });
  };

  /* =========================================================
     ADD SPECIFICATION
  ========================================================= */

  const addSpecification = () => {
    if (specifications.length >= MAX_SPECIFICATIONS) {
      return;
    }

    setSpecifications((current) => [
      ...current,
      { ...DEFAULT_SPECIFICATION },
    ]);

    setSaved(false);
  };

  /* =========================================================
     REMOVE SPECIFICATION
  ========================================================= */

  const removeSpecification = (index) => {
    if (specifications.length === 1) {
      setSpecifications([
        { ...DEFAULT_SPECIFICATION },
      ]);

      setErrors({});
      setSaved(false);

      return;
    }

    setSpecifications((current) =>
      current.filter(
        (_, specificationIndex) =>
          specificationIndex !== index
      )
    );

    setErrors((current) => {
      const nextErrors = { ...current };

      delete nextErrors[`specification-${index}`];

      return nextErrors;
    });

    setSaved(false);
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validate = () => {
    const nextErrors = {};

    const hasAnySpecification =
      specifications.some(
        (specification) =>
          specification.name.trim() ||
          specification.value.trim() ||
          specification.unit.trim()
      );

    if (!hasAnySpecification) {
      nextErrors.general =
        "Add at least one technical specification.";
    }

    specifications.forEach(
      (specification, index) => {
        const hasName =
          specification.name.trim().length > 0;

        const hasValue =
          specification.value.trim().length > 0;

        const hasUnit =
          specification.unit.trim().length > 0;

        const hasAnyValue =
          hasName ||
          hasValue ||
          hasUnit;

        if (hasAnyValue && !hasName) {
          nextErrors[`specification-${index}`] =
            "Specification name is required.";
        } else if (hasAnyValue && !hasValue) {
          nextErrors[`specification-${index}`] =
            "Specification value is required.";
        }
      }
    );

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* =========================================================
     SAVE DRAFT
  ========================================================= */

  const handleSaveDraft = () => {
    const draft = {
      status: "DRAFT",
      productIdentity,
      productInformation,
      features: incomingFeatures,
      applications: incomingApplications,
      includedItems: incomingIncludedItems,
      excludedItems: incomingExcludedItems,
      specifications,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "arianiqs_product_technical_specifications_draft",
      JSON.stringify(draft)
    );

    setSaved(true);
  };

  /* =========================================================
     NEXT STEP — V-06 IMAGES
  ========================================================= */

  const handleNext = () => {
    if (!validate()) {
      return;
    }

    navigate("/products/images", {
      state: {
        productIdentity,
        productInformation,
        features: incomingFeatures,
        applications: incomingApplications,
        includedItems: incomingIncludedItems,
        excludedItems: incomingExcludedItems,
        specifications,
      },
    });
  };

  /* =========================================================
     BACK TO V-04 FEATURES
  ========================================================= */

  const handleBack = () => {
    navigate("/products/features", {
      state: {
        productIdentity,
        productInformation,
        features: incomingFeatures,
        applications: incomingApplications,
        includedItems: incomingIncludedItems,
        excludedItems: incomingExcludedItems,
      },
    });
  };

  /* =========================================================
     SPECIFICATION ROW
  ========================================================= */

  const renderSpecificationRow = (
    specification,
    index
  ) => {
    const rowError =
      errors[`specification-${index}`];

    return (
      <div
        className="v04-specification-row"
        key={`specification-${index}`}
      >
        {/* NUMBER */}

        <div className="v04-row-number">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* SPECIFICATION */}

        <div className="v04-specification-field">
          <label
            htmlFor={`specification-name-${index}`}
          >
            Specification
          </label>

          <div className="v04-specification-input-wrapper">
            <input
              id={`specification-name-${index}`}
              type="text"
              value={specification.name}
              maxLength={SPEC_NAME_MAX_LENGTH}
              placeholder="Example: Number of digital inputs"
              onChange={(event) =>
                updateSpecification(
                  index,
                  "name",
                  event.target.value,
                  SPEC_NAME_MAX_LENGTH
                )
              }
            />

            <span className="v04-character-count">
              {specification.name.length}/
              {SPEC_NAME_MAX_LENGTH}
            </span>
          </div>
        </div>

        {/* VALUE */}

        <div className="v04-specification-field">
          <label
            htmlFor={`specification-value-${index}`}
          >
            Value
          </label>

          <div className="v04-specification-input-wrapper">
            <input
              id={`specification-value-${index}`}
              type="text"
              value={specification.value}
              maxLength={SPEC_VALUE_MAX_LENGTH}
              placeholder="Example: 14"
              onChange={(event) =>
                updateSpecification(
                  index,
                  "value",
                  event.target.value,
                  SPEC_VALUE_MAX_LENGTH
                )
              }
            />

            <span className="v04-character-count">
              {specification.value.length}/
              {SPEC_VALUE_MAX_LENGTH}
            </span>
          </div>
        </div>

        {/* UNIT */}

        <div className="v04-specification-field v04-unit-field">
          <label
            htmlFor={`specification-unit-${index}`}
          >
            Unit
          </label>

          <input
            id={`specification-unit-${index}`}
            type="text"
            value={specification.unit}
            maxLength={SPEC_UNIT_MAX_LENGTH}
            placeholder="Example: channels"
            onChange={(event) =>
              updateSpecification(
                index,
                "unit",
                event.target.value,
                SPEC_UNIT_MAX_LENGTH
              )
            }
          />
        </div>

        {/* REMOVE */}

        <button
          type="button"
          className="v04-remove-button"
          title="Remove specification"
          aria-label={`Remove specification ${index + 1}`}
          onClick={() =>
            removeSpecification(index)
          }
        >
          <Trash2 size={17} />
        </button>

        {/* ERROR */}

        {rowError && (
          <div className="v04-specification-error">
            {rowError}
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="technical-specifications-page">

      <div className="product-wizard-shell">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="product-wizard-header">

          <div className="product-step-label">
            PRODUCT CREATION
          </div>

          <div className="product-step-badge">
            <span className="product-step-badge-dot" />
            STEP 5 OF 10
          </div>

          <h1>
            Technical Specifications
          </h1>

          <p>
            Define the measurable technical
            specifications and product parameters
            that customers will see.
          </p>

        </header>

        {/* =====================================================
            PRODUCT CREATION PROGRESS
        ===================================================== */}

        <div className="product-progress">

          <div className="product-progress-step completed">
            <span className="progress-number completed-number">
              <CheckCircle2 size={12} />
            </span>

            <span className="progress-label">
              Identity
            </span>
          </div>

          <div className="product-progress-line active" />

          <div className="product-progress-step completed">
            <span className="progress-number completed-number">
              <CheckCircle2 size={12} />
            </span>

            <span className="progress-label">
              Match Result
            </span>
          </div>

          <div className="product-progress-line active" />

          <div className="product-progress-step completed">
            <span className="progress-number completed-number">
              <CheckCircle2 size={12} />
            </span>

            <span className="progress-label">
              Basic Information
            </span>
          </div>

          <div className="product-progress-line active" />

          <div className="product-progress-step completed">
            <span className="progress-number completed-number">
              <CheckCircle2 size={12} />
            </span>

            <span className="progress-label">
              Features & Applications
            </span>
          </div>

          <div className="product-progress-line active" />

          <div className="product-progress-step active">
            <span className="progress-number active-number">
              5
            </span>

            <span className="progress-label active-label">
              Technical Specifications
            </span>
          </div>

          <div className="product-progress-line" />

          <div className="product-progress-step">
            <span className="progress-number">
              6
            </span>

            <span className="progress-label">
              Images
            </span>
          </div>

          <div className="product-progress-line" />

          <div className="product-progress-step">
            <span className="progress-number">
              7
            </span>

            <span className="progress-label">
              Documents
            </span>
          </div>

        </div>

        {/* =====================================================
            PRODUCT IDENTITY SUMMARY
        ===================================================== */}

        <div className="features-identity-card">

          <div className="features-identity-title">

            <div>
              <span>
                PRODUCT IDENTITY
              </span>

              <h2>
                {productInformation.productName ||
                  productIdentity.mpn ||
                  "New Product"}
              </h2>
            </div>

            <span className="status-badge status-new">
              NEW PRODUCT
            </span>

          </div>

          <div className="features-identity-grid">

            <div>
              <span>
                Brand
              </span>

              <strong>
                {productIdentity.brand || "—"}
              </strong>
            </div>

            <div>
              <span>
                Category
              </span>

              <strong>
                {productIdentity.category || "—"}
              </strong>
            </div>

            <div>
              <span>
                Product Type
              </span>

              <strong>
                {productIdentity.productType ||
                  productIdentity.type ||
                  "—"}
              </strong>
            </div>

            <div>
              <span>
                MPN / Part Number
              </span>

              <strong>
                {productIdentity.mpn || "—"}
              </strong>
            </div>

          </div>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="features-product-layout">

          <div className="features-product-card">

            {/* =================================================
                TECHNICAL PRODUCT DATA
            ================================================= */}

            <section className="features-section">

              <div className="features-section-header">

                <div>

                  <div className="features-section-label">
                    TECHNICAL DATA
                  </div>

                  <h2>
                    Technical Product Data
                  </h2>

                  <p>
                    These specifications help customers
                    understand and compare the technical
                    characteristics of the product.
                  </p>

                </div>

                <div className="features-count">
                  {specificationCount}/
                  {MAX_SPECIFICATIONS}
                </div>

              </div>

              {/* SPECIFICATION TABLE HEADER */}

              <div className="v04-specification-header">

                <div>#</div>

                <div>Specification</div>

                <div>Value</div>

                <div>Unit</div>

                <div>Action</div>

              </div>

              {/* SPECIFICATION ROWS */}

              <div className="v04-specification-list">

                {specifications.map(
                  (specification, index) =>
                    renderSpecificationRow(
                      specification,
                      index
                    )
                )}

              </div>

              {/* GENERAL ERROR */}

              {errors.general && (
                <div className="features-error">
                  {errors.general}
                </div>
              )}

              {/* ADD SPECIFICATION */}

              <button
                type="button"
                className="add-repeatable-button"
                disabled={
                  specifications.length >=
                  MAX_SPECIFICATIONS
                }
                onClick={addSpecification}
              >
                <Plus size={17} />
                Add Specification
              </button>

              <div className="v04-limit-note">
                Maximum {MAX_SPECIFICATIONS} technical
                specifications.
              </div>

            </section>

            {/* =================================================
                COMMON EXAMPLES
            ================================================= */}

            <section className="technical-example-section">

              <div className="features-section-label">
                COMMON SPECIFICATION EXAMPLES
              </div>

              <h3>
                Typical industrial parameters
              </h3>

              <p>
                Use clear specification names,
                measurable values and appropriate
                units.
              </p>

              <div className="technical-example-grid">

                <div className="technical-example-item">

                  <strong>
                    Digital Inputs
                  </strong>

                  <span>
                    14
                  </span>

                  <small>
                    channels
                  </small>

                </div>

                <div className="technical-example-item">

                  <strong>
                    Digital Outputs
                  </strong>

                  <span>
                    10
                  </span>

                  <small>
                    channels
                  </small>

                </div>

                <div className="technical-example-item">

                  <strong>
                    Supply Voltage
                  </strong>

                  <span>
                    24
                  </span>

                  <small>
                    V DC
                  </small>

                </div>

                <div className="technical-example-item">

                  <strong>
                    Operating Temperature
                  </strong>

                  <span>
                    -20 to 60
                  </span>

                  <small>
                    °C
                  </small>

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="features-product-sidebar">

            {/* =================================================
                TECHNICAL PRODUCT DATA INFORMATION
            ================================================= */}

            <div className="information-panel">

              <div className="information-panel-icon">
                <CheckCircle2 size={20} />
              </div>

              <h3>
                Technical product data
              </h3>

              <p>
                These specifications help customers
                understand and compare the technical
                characteristics of the product.
              </p>

            </div>

            {/* =================================================
                CUSTOMER CONTENT
            ================================================= */}

            <div className="customer-content-panel">

              <h3>
                Customer content
              </h3>

              <div className="customer-data-row">

                <span>
                  Product name
                </span>

                <strong>
                  {productInformation.productName ||
                    "Not provided"}
                </strong>

              </div>

              <div className="customer-data-row">

                <span>
                  Features
                </span>

                <strong>
                  {
                    incomingFeatures.filter(
                      (item) => item.trim()
                    ).length
                  }
                </strong>

              </div>

              <div className="customer-data-row">

                <span>
                  Applications
                </span>

                <strong>
                  {
                    incomingApplications.filter(
                      (item) => item.trim()
                    ).length
                  }
                </strong>

              </div>

              <div className="customer-data-row">

                <span>
                  Specifications
                </span>

                <strong>
                  {completedSpecificationCount}
                </strong>

              </div>

            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="technical-status-panel">

              <div className="technical-status-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>

                <strong>
                  Specification status
                </strong>

                <span>
                  {completedSpecificationCount > 0
                    ? `${completedSpecificationCount} specification${
                        completedSpecificationCount === 1
                          ? ""
                          : "s"
                      } completed`
                    : "No specifications added yet"}
                </span>

              </div>

            </div>

            {/* =================================================
                PRODUCTION NOTE
            ================================================= */}

            <div className="production-note">

              <strong>
                Production workflow
              </strong>

              <p>
                After this step, the product
                continues to images, documents,
                commercial offer configuration and
                final review before submission to
                ArianIQS.
              </p>

            </div>

          </aside>

        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

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

            {saved && (
              <div className="draft-saved-message">
                <CheckCircle2 size={16} />
                Draft saved
              </div>
            )}

            <button
              type="button"
              className="draft-action"
              onClick={handleSaveDraft}
            >
              <Save size={17} />
              Save Draft
            </button>

            <button
              type="button"
              className="primary-action"
              onClick={handleNext}
            >
              Next
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TechnicalSpecifications;