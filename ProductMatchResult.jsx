import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Search,
  ShieldCheck,
  Package,
  GitCompare,
  FileSearch,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function ProductMatchResult() {
  const navigate = useNavigate();
  const location = useLocation();

  /*
    ============================================================
    MATCH RESULT
    ============================================================
  */

  const backendResult = location.state?.matchResult;

  /*
    Temporary fallback.

    If V-02 is opened directly without V-01,
    show NO_MATCH so the development flow can
    continue to V-03.
  */

  const matchResult =
    backendResult || {
      result: "NO_MATCH",
      action: "CREATE_NEW_PRODUCT",
    };

  const productIdentity =
    location.state?.productIdentity || {
      brand: "Siemens",
      category: "Industrial Automation",
      type: "PLC",
      mpn: "NEW-PRODUCT-001",
    };

  const result = matchResult.result;

  /* ==============================
     NAVIGATION
     ============================== */

  const goBack = () => {
    navigate("/products/add");
  };

  const goToOffer = () => {
    navigate("/products/offer", {
      state: {
        masterProduct: matchResult,
        productIdentity,
      },
    });
  };

  const goToBasicInformation = () => {
    navigate("/products/basic-information", {
      state: {
        productIdentity,
        matchResult,
      },
    });
  };

  /* ==============================
     RESULT CONFIGURATION
     ============================== */

  const getResultConfig = () => {

    if (result === "EXACT_MATCH") {
      return {
        type: "exact",
        icon: CheckCircle2,
        eyebrow: "PRODUCT MATCH",
        title: "Existing product found",
        description:
          "A matching master product already exists in the ArianIQS catalog. You do not need to create the product again. Continue by adding your vendor commercial offer.",
      };
    }

    if (
      result === "POSSIBLE_MATCH" ||
      result === "REVIEW_REQUIRED" ||
      result === "POSSIBLE_MATCHES"
    ) {
      return {
        type: "possible",
        icon: AlertTriangle,
        eyebrow: "PRODUCT MATCH REVIEW",
        title: "Possible product match found",
        description:
          "Similar products were found in the ArianIQS catalog. Review the possible matches before creating a new product.",
      };
    }

    return {
      type: "new",
      icon: Search,
      eyebrow: "PRODUCT MATCH",
      title: "No existing product found",
      description:
        "No approved master product was found for this product identity. Continue to provide the complete product information for ArianIQS review.",
    };
  };

  const config = getResultConfig();

  const ResultIcon = config.icon;

  return (
    <div className="product-match-page">

      {/* ==============================
          HEADER
         ============================== */}

      <div className="product-match-header">

        <div className="product-match-header-left">

          <button
            className="back-button"
            type="button"
            onClick={goBack}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div>

            <div className="product-eyebrow">
              PRODUCT CATALOG
            </div>

            <h1>
              Product Match Result
            </h1>

            <p>
              ArianIQS has checked the product identity
              against the master product catalog.
            </p>

          </div>

        </div>

      </div>

      {/* ==============================
          WORKFLOW
         ============================== */}

      <div className="product-step-card">

        <div className="product-step completed">

          <div className="step-number">
            <CheckCircle2 size={17} />
          </div>

          <div>
            <strong>
              Product Identity
            </strong>

            <span>
              Completed
            </span>
          </div>

        </div>

        <div className="step-line active"></div>

        <div className="product-step active">

          <div className="step-number">
            2
          </div>

          <div>
            <strong>
              Product Match
            </strong>

            <span>
              Current step
            </span>
          </div>

        </div>

        <div className="step-line"></div>

        <div className="product-step">

          <div className="step-number">
            3
          </div>

          <div>
            <strong>
              Product Information
            </strong>

            <span>
              Next step
            </span>
          </div>

        </div>

      </div>

      {/* ==============================
          RESULT BANNER
         ============================== */}

      <section
        className={`match-result-banner match-result-${config.type}`}
      >

        <div className="match-result-icon">
          <ResultIcon size={25} />
        </div>

        <div className="match-result-content">

          <div className="match-result-eyebrow">
            {config.eyebrow}
          </div>

          <h2>
            {config.title}
          </h2>

          <p>
            {config.description}
          </p>

        </div>

        <div className="match-engine-badge">

          <GitCompare size={16} />

          Match Engine

        </div>

      </section>

      {/* ==============================
          MAIN GRID
         ============================== */}

      <div className="product-match-layout">

        {/* LEFT */}

        <main className="product-match-main">

          {/* IDENTITY */}

          <section className="match-card">

            <div className="match-card-header">

              <div>

                <span className="form-step-label">
                  VERIFIED INPUT
                </span>

                <h2>
                  Product Identity
                </h2>

                <p>
                  These are the product details submitted from
                  V-01.
                </p>

              </div>

              <div className="match-card-header-icon">
                <ShieldCheck size={20} />
              </div>

            </div>

            <div className="identity-summary-grid">

              <div className="identity-summary-item">

                <span>
                  Brand / Manufacturer
                </span>

                <strong>
                  {productIdentity.brand}
                </strong>

              </div>

              <div className="identity-summary-item">

                <span>
                  Category
                </span>

                <strong>
                  {productIdentity.category}
                </strong>

              </div>

              <div className="identity-summary-item">

                <span>
                  Product Type
                </span>

                <strong>
                  {productIdentity.type}
                </strong>

              </div>

              <div className="identity-summary-item identity-summary-mpn">

                <span>
                  MPN / Part Number
                </span>

                <strong>
                  {productIdentity.mpn}
                </strong>

              </div>

            </div>

          </section>

          {/* ==============================
              EXACT MATCH
             ============================== */}

          {config.type === "exact" && (

            <section className="match-card">

              <div className="match-card-header">

                <div>

                  <span className="form-step-label">
                    EXISTING MASTER PRODUCT
                  </span>

                  <h2>
                    Matching product
                  </h2>

                  <p>
                    This product is already maintained in the
                    ArianIQS master catalog.
                  </p>

                </div>

                <div className="match-success-mark">
                  <CheckCircle2 size={21} />
                </div>

              </div>

              <div className="master-product-result">

                <div className="master-product-icon">
                  <Package size={25} />
                </div>

                <div className="master-product-details">

                  <span className="master-product-code">
                    {matchResult.ariq_product_code ||
                      "ArianIQS Product Code"}
                  </span>

                  <h3>
                    {matchResult.product_name ||
                      "Existing Master Product"}
                  </h3>

                  <div className="master-product-meta">

                    <span>
                      Master Product ID:{" "}
                      <strong>
                        {matchResult.master_product_id || "—"}
                      </strong>
                    </span>

                    <span className="verified-product-status">

                      <CheckCircle2 size={14} />

                      Approved Master

                    </span>

                  </div>

                </div>

              </div>

              <div className="match-rule-box">

                <ShieldCheck size={18} />

                <div>

                  <strong>
                    Why you are seeing this
                  </strong>

                  <p>
                    ArianIQS already maintains the product
                    identity. You only need to provide your
                    vendor-specific commercial offer.
                  </p>

                </div>

              </div>

              <div className="match-card-actions">

                <button
                  className="secondary-product-button"
                  type="button"
                  onClick={goBack}
                >
                  <ArrowLeft size={16} />
                  Edit Identity
                </button>

                <button
                  className="primary-product-button"
                  type="button"
                  onClick={goToOffer}
                >
                  Add My Offer
                  <ArrowRight size={17} />
                </button>

              </div>

            </section>
          )}

          {/* ==============================
              POSSIBLE MATCH
             ============================== */}

          {config.type === "possible" && (

            <section className="match-card">

              <div className="match-card-header">

                <div>

                  <span className="form-step-label">
                    POSSIBLE PRODUCTS
                  </span>

                  <h2>
                    Review possible matches
                  </h2>

                  <p>
                    Do not create a duplicate product until the
                    possible matches have been reviewed.
                  </p>

                </div>

                <div className="match-warning-mark">
                  <AlertTriangle size={21} />
                </div>

              </div>

              <div className="possible-match-notice">

                <AlertTriangle size={18} />

                <div>

                  <strong>
                    Similar products require verification
                  </strong>

                  <p>
                    The match engine found products that may
                    represent the same physical product. An
                    uncertain match must not be automatically
                    merged.
                  </p>

                </div>

              </div>

              <div className="possible-product-list">

                {(matchResult.possible_products || []).map(
                  (product) => (

                    <div
                      className="possible-product-item"
                      key={product.id}
                    >

                      <div className="possible-product-icon">
                        <Package size={19} />
                      </div>

                      <div className="possible-product-info">

                        <span>
                          {product.code}
                        </span>

                        <strong>
                          {product.name}
                        </strong>

                        <small>
                          MPN: {product.mpn}
                        </small>

                      </div>

                      <div className="possible-product-match">
                        {product.match}
                      </div>

                      <button
                        type="button"
                        className="review-product-button"
                      >
                        Review
                      </button>

                    </div>

                  )
                )}

              </div>

              <div className="match-card-actions">

                <button
                  className="secondary-product-button"
                  type="button"
                  onClick={goBack}
                >
                  <ArrowLeft size={16} />
                  Edit Identity
                </button>

                <button
                  className="primary-product-button"
                  type="button"
                >
                  Request ArianIQS Review
                  <ArrowRight size={17} />
                </button>

              </div>

            </section>
          )}

          {/* ==============================
              NO MATCH
             ============================== */}

          {config.type === "new" && (

            <section className="match-card">

              <div className="match-card-header">

                <div>

                  <span className="form-step-label">
                    NEW PRODUCT
                  </span>

                  <h2>
                    Create new product submission
                  </h2>

                  <p>
                    No approved master product currently
                    matches this product identity.
                  </p>

                </div>

                <div className="match-new-mark">
                  <FileSearch size={21} />
                </div>

              </div>

              <div className="new-product-flow">

                <div className="new-product-flow-item">

                  <div className="flow-check">
                    <CheckCircle2 size={16} />
                  </div>

                  <div>

                    <strong>
                      Product identity completed
                    </strong>

                    <span>
                      Brand, category, type and MPN have
                      been provided.
                    </span>

                  </div>

                </div>

                <div className="new-product-flow-line"></div>

                <div className="new-product-flow-item current">

                  <div className="flow-check">
                    <ArrowRight size={16} />
                  </div>

                  <div>

                    <strong>
                      Complete product information
                    </strong>

                    <span>
                      Continue with product details,
                      technical information, media and
                      documents.
                    </span>

                  </div>

                </div>

                <div className="new-product-flow-line"></div>

                <div className="new-product-flow-item">

                  <div className="flow-check">
                    <ShieldCheck size={16} />
                  </div>

                  <div>

                    <strong>
                      ArianIQS review
                    </strong>

                    <span>
                      The new product will be reviewed before
                      marketplace publication.
                    </span>

                  </div>

                </div>

              </div>

              <div className="match-card-actions">

                <button
                  className="secondary-product-button"
                  type="button"
                  onClick={goBack}
                >
                  <ArrowLeft size={16} />
                  Edit Identity
                </button>

                <button
                  className="primary-product-button"
                  type="button"
                  onClick={goToBasicInformation}
                >
                  Continue to Product Information
                  <ArrowRight size={17} />
                </button>

              </div>

            </section>
          )}

        </main>

        {/* ==============================
            RIGHT SIDEBAR
           ============================== */}

        <aside className="product-match-sidebar">

          <section className="match-side-card">

            <div className="match-side-icon">
              <GitCompare size={19} />
            </div>

            <h3>
              How product matching works
            </h3>

            <p>
              ArianIQS checks the submitted identity against
              the controlled master product catalog.
            </p>

            <div className="matching-rule">

              <span>01</span>

              <div>
                <strong>
                  Brand + display MPN
                </strong>

                <p>
                  Exact identity comparison.
                </p>
              </div>

            </div>

            <div className="matching-rule">

              <span>02</span>

              <div>
                <strong>
                  Normalized MPN
                </strong>

                <p>
                  Search comparison value.
                </p>
              </div>

            </div>

            <div className="matching-rule">

              <span>03</span>

              <div>
                <strong>
                  Product family
                </strong>

                <p>
                  Used where configured.
                </p>
              </div>

            </div>

            <div className="matching-rule">

              <span>04</span>

              <div>
                <strong>
                  Technical attributes
                </strong>

                <p>
                  Used when available.
                </p>
              </div>

            </div>

            <div className="matching-rule warning-rule">

              <span>!</span>

              <div>
                <strong>
                  Uncertain match
                </strong>

                <p>
                  Sent for review instead of automatic
                  merging.
                </p>
              </div>

            </div>

          </section>

          <section className="match-side-card match-side-note">

            <div className="match-side-icon">
              <ShieldCheck size={19} />
            </div>

            <h3>
              Catalog protection
            </h3>

            <p>
              The vendor does not create or modify the
              ArianIQS master catalog directly. Product identity
              and publication are controlled by the platform.
            </p>

          </section>

        </aside>

      </div>

    </div>
  );
}

export default ProductMatchResult;