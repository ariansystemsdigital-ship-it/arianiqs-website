import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Save,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const COUNTRIES = [
  "India",
  "Germany",
  "United States",
  "Japan",
  "China",
  "United Kingdom",
  "France",
  "Italy",
  "Switzerland",
  "South Korea",
  "Other",
];

function BasicProductInformation() {
  const navigate = useNavigate();
  const location = useLocation();

  const productIdentity =
    location.state?.productIdentity || {
      brand: "Siemens",
      category: "Industrial Automation",
      type: "PLC",
      mpn: "NEW-PRODUCT-001",
    };

  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [productFamily, setProductFamily] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const remaining = useMemo(
    () => ({
      productName: 200 - productName.length,
      shortDescription:
        300 - shortDescription.length,
      fullDescription:
        5000 - fullDescription.length,
    }),
    [
      productName,
      shortDescription,
      fullDescription,
    ]
  );

  const validate = () => {
    const nextErrors = {};

    if (!productName.trim()) {
      nextErrors.productName =
        "Product Name is required.";
    }

    if (!shortDescription.trim()) {
      nextErrors.shortDescription =
        "Short Description is required.";
    }

    if (!fullDescription.trim()) {
      nextErrors.fullDescription =
        "Full Description is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSaveDraft = () => {
    const draft = {
      step: "V-03",
      productIdentity,

      productInformation: {
        productName,
        shortDescription,
        fullDescription,
        productFamily,
        countryOfOrigin,
      },

      status: "DRAFT",
    };

    console.log(
      "V-03 Draft:",
      draft
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleNext = () => {
    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const productInformation = {
      productName:
        productName.trim(),

      shortDescription:
        shortDescription.trim(),

      fullDescription:
        fullDescription.trim(),

      productFamily:
        productFamily.trim(),

      countryOfOrigin,
    };

    console.log(
      "V-03 Product Information:",
      productInformation
    );

    /*
      V-04 will be created next.
    */

    navigate("/products/features", {
      state: {
        productIdentity,
        productInformation,
      },
    });
  };

  const handleBack = () => {
    navigate("/products/match", {
      state: {
        productIdentity,

        matchResult: {
          result: "NO_MATCH",
          action: "CREATE_NEW_PRODUCT",
        },
      },
    });
  };

  return (
    <div className="basic-product-page">

      <div className="product-wizard-shell">

        {/* ==============================
            HEADER
           ============================== */}

        <div className="product-wizard-header">

          <div>

            <div className="product-step-label">
              ADD PRODUCT · STEP 2 OF 10
            </div>

            <h1>
              Basic Product Information
            </h1>

            <p>
              Provide the official customer-facing
              information for this new product.
            </p>

          </div>

          <div className="product-step-badge">

            <span className="product-step-badge-dot"></span>

            V-03

          </div>

        </div>

        {/* ==============================
            PROGRESS
           ============================== */}

        <div className="product-progress">

          <div className="product-progress-step completed">

            <span>✓</span>

            <label>
              Identity
            </label>

          </div>

          <div className="product-progress-line completed"></div>

          <div className="product-progress-step completed">

            <span>✓</span>

            <label>
              Match Result
            </label>

          </div>

          <div className="product-progress-line active"></div>

          <div className="product-progress-step active">

            <span>3</span>

            <label>
              Basic Information
            </label>

          </div>

          <div className="product-progress-line"></div>

          <div className="product-progress-step">

            <span>4</span>

            <label>
              Features
            </label>

          </div>

          <div className="product-progress-line"></div>

          <div className="product-progress-step">

            <span>5</span>

            <label>
              Technical
            </label>

          </div>

        </div>

        {/* ==============================
            LAYOUT
           ============================== */}

        <div className="basic-product-layout">

          {/* ==============================
              MAIN FORM
             ============================== */}

          <section className="basic-product-card">

            <div className="basic-card-header">

              <div>

                <h2>
                  Product Information
                </h2>

                <p>
                  Enter accurate manufacturer
                  information. This information will be
                  used on the Arianiqs customer product
                  page after approval.
                </p>

              </div>

            </div>

            {/* ==============================
                PRODUCT IDENTITY
               ============================== */}

            <div className="identity-reference">

              <div className="identity-reference-title">
                Product Identity
              </div>

              <div className="identity-reference-grid">

                <div>

                  <span>
                    Brand
                  </span>

                  <strong>
                    {productIdentity.brand}
                  </strong>

                </div>

                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {productIdentity.category}
                  </strong>

                </div>

                <div>

                  <span>
                    Product Type
                  </span>

                  <strong>
                    {productIdentity.type}
                  </strong>

                </div>

                <div>

                  <span>
                    MPN
                  </span>

                  <strong>
                    {productIdentity.mpn}
                  </strong>

                </div>

              </div>

            </div>

            {/* ==============================
                PRODUCT NAME
               ============================== */}

            <div className="form-field">

              <div className="field-label-row">

                <label htmlFor="productName">
                  Product Name <span>*</span>
                </label>

                <span
                  className={
                    remaining.productName < 20
                      ? "character-counter warning"
                      : "character-counter"
                  }
                >
                  {productName.length} / 200
                </span>

              </div>

              <input
                id="productName"
                type="text"
                maxLength={200}
                value={productName}
                onChange={(event) => {
                  setProductName(
                    event.target.value
                  );

                  setErrors((previous) => ({
                    ...previous,
                    productName: "",
                  }));
                }}
                placeholder="Example: SIMATIC S7-1200 CPU 1215C"
                className={
                  errors.productName
                    ? "input-error"
                    : ""
                }
              />

              <p className="field-help">
                Use the official manufacturer/product
                name. Do not use vendor sales language
                or unsupported claims.
              </p>

              {errors.productName && (
                <div className="field-error">
                  {errors.productName}
                </div>
              )}

            </div>

            {/* ==============================
                SHORT DESCRIPTION
               ============================== */}

            <div className="form-field">

              <div className="field-label-row">

                <label htmlFor="shortDescription">
                  Short Description <span>*</span>
                </label>

                <span
                  className={
                    remaining.shortDescription < 30
                      ? "character-counter warning"
                      : "character-counter"
                  }
                >
                  {shortDescription.length} / 300
                </span>

              </div>

              <textarea
                id="shortDescription"
                maxLength={300}
                rows={4}
                value={shortDescription}
                onChange={(event) => {
                  setShortDescription(
                    event.target.value
                  );

                  setErrors((previous) => ({
                    ...previous,
                    shortDescription: "",
                  }));
                }}
                placeholder="Example: Compact PLC for industrial automation applications..."
                className={
                  errors.shortDescription
                    ? "input-error"
                    : ""
                }
              />

              <p className="field-help">
                A concise explanation used in product
                cards, search results and the top of the
                product page.
              </p>

              {errors.shortDescription && (
                <div className="field-error">
                  {errors.shortDescription}
                </div>
              )}

            </div>

            {/* ==============================
                FULL DESCRIPTION
               ============================== */}

            <div className="form-field">

              <div className="field-label-row">

                <label htmlFor="fullDescription">
                  Full Description <span>*</span>
                </label>

                <span
                  className={
                    remaining.fullDescription < 250
                      ? "character-counter warning"
                      : "character-counter"
                  }
                >
                  {fullDescription.length} / 5000
                </span>

              </div>

              <textarea
                id="fullDescription"
                maxLength={5000}
                rows={9}
                value={fullDescription}
                onChange={(event) => {
                  setFullDescription(
                    event.target.value
                  );

                  setErrors((previous) => ({
                    ...previous,
                    fullDescription: "",
                  }));
                }}
                placeholder="Provide a detailed description of the product, its purpose, major characteristics and application context..."
                className={
                  errors.fullDescription
                    ? "input-error"
                    : ""
                }
              />

              <p className="field-help">
                Maximum 5,000 characters. Rich text may
                be supported later, but all submitted
                content must be sanitized by the backend.
              </p>

              {errors.fullDescription && (
                <div className="field-error">
                  {errors.fullDescription}
                </div>
              )}

            </div>

            {/* ==============================
                FAMILY + COUNTRY
               ============================== */}

            <div className="form-two-column">

              <div className="form-field">

                <div className="field-label-row">

                  <label htmlFor="productFamily">
                    Product Family
                  </label>

                  <span className="optional-label">
                    Optional
                  </span>

                </div>

                <input
                  id="productFamily"
                  type="text"
                  value={productFamily}
                  onChange={(event) =>
                    setProductFamily(
                      event.target.value
                    )
                  }
                  placeholder="Example: S7-1200"
                />

                <p className="field-help">
                  Manufacturer series or family where
                  applicable.
                </p>

              </div>

              <div className="form-field">

                <div className="field-label-row">

                  <label htmlFor="countryOfOrigin">
                    Country of Origin
                  </label>

                  <span className="optional-label">
                    Optional
                  </span>

                </div>

                <select
                  id="countryOfOrigin"
                  value={countryOfOrigin}
                  onChange={(event) =>
                    setCountryOfOrigin(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Select country
                  </option>

                  {COUNTRIES.map(
                    (country) => (
                      <option
                        key={country}
                        value={country}
                      >
                        {country}
                      </option>
                    )
                  )}

                </select>

                <p className="field-help">
                  Structured country value where
                  required by Arianiqs policy.
                </p>

              </div>

            </div>

            {/* ==============================
                SAVED MESSAGE
               ============================== */}

            {saved && (

              <div className="draft-saved-message">

                <CheckCircle2 size={18} />

                <div>

                  <strong>
                    Draft saved
                  </strong>

                  <span>
                    Your V-03 information is stored as a
                    draft for this development session.
                  </span>

                </div>

              </div>

            )}

            {/* ==============================
                ACTIONS
               ============================== */}

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

          </section>

          {/* ==============================
              RIGHT INFORMATION
             ============================== */}

          <aside className="basic-product-sidebar">

            <div className="information-panel">

              <div className="information-panel-icon">
                <CheckCircle2 size={19} />
              </div>

              <h3>
                What happens next?
              </h3>

              <p>
                After completing this screen, the
                product moves to the structured Features
                & Applications step.
              </p>

              <div className="next-step-list">

                <div className="next-step-item current">

                  <span>
                    03
                  </span>

                  <div>

                    <strong>
                      Basic Information
                    </strong>

                    <small>
                      Current step
                    </small>

                  </div>

                </div>

                <div className="next-step-item">

                  <span>
                    04
                  </span>

                  <div>

                    <strong>
                      Features & Applications
                    </strong>

                    <small>
                      Next step
                    </small>

                  </div>

                </div>

                <div className="next-step-item">

                  <span>
                    05
                  </span>

                  <div>

                    <strong>
                      Technical Specifications
                    </strong>

                    <small>
                      Dynamic attributes
                    </small>

                  </div>

                </div>

              </div>

            </div>

            {/* CUSTOMER DATA */}

            <div className="customer-content-panel">

              <h3>
                Customer-facing data
              </h3>

              <p>
                These fields contribute to the
                information customers can see on the
                approved product page.
              </p>

              <div className="customer-data-row">
                <span>Product Name</span>
                <strong>Customer visible</strong>
              </div>

              <div className="customer-data-row">
                <span>Short Description</span>
                <strong>Search & cards</strong>
              </div>

              <div className="customer-data-row">
                <span>Full Description</span>
                <strong>Product page</strong>
              </div>

              <div className="customer-data-row">
                <span>Product Family</span>
                <strong>When applicable</strong>
              </div>

              <div className="customer-data-row">
                <span>Country</span>
                <strong>When applicable</strong>
              </div>

            </div>

            {/* PRODUCTION NOTE */}

            <div className="production-note">

              <strong>
                Production rule
              </strong>

              <p>
                Frontend validation improves user
                experience, but backend validation remains
                the source of truth before submission or
                publication.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default BasicProductInformation;