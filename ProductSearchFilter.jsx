import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Search,
  Tag,
  SlidersHorizontal,
  Info,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductSearchFilter.css";

const STANDARD_FILTERS = [
  {
    id: "brand",
    label: "Brand",
    value: "Siemens",
    required: true,
  },
  {
    id: "category",
    label: "Category",
    value: "Industrial Automation",
    required: true,
  },
  {
    id: "type",
    label: "Product Type",
    value: "PLC",
    required: true,
  },
];

const CONFIGURED_ATTRIBUTES = [
  {
    id: "supplyVoltage",
    label: "Supply Voltage",
    value: "24 VDC",
    filterType: "Text",
  },
  {
    id: "digitalInputs",
    label: "Digital Inputs",
    value: "14",
    filterType: "Number",
  },
  {
    id: "digitalOutputs",
    label: "Digital Outputs",
    value: "10",
    filterType: "Number",
  },
  {
    id: "communication",
    label: "Communication Interface",
    value: "PROFINET",
    filterType: "Multi-select",
  },
  {
    id: "mounting",
    label: "Mounting",
    value: "DIN Rail",
    filterType: "Select",
  },
  {
    id: "operatingTemperature",
    label: "Operating Temperature",
    value: "-20 to 60 °C",
    filterType: "Range",
  },
];

const INITIAL_KEYWORDS = [
  "Siemens",
  "SIMATIC",
  "S7-1200",
  "PLC",
  "CPU",
  "Industrial Automation",
];

function ProductSearchFilter() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productIdentity,
    productInformation,
    features,
    applications,
    includedItems,
    excludedItems,
    technicalSpecifications,
    images,
    documents,
  } = location.state || {};

  const identity = productIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    subCategory: "",
    productName: "simatic s71200",
  };

  const [keywords, setKeywords] = useState(INITIAL_KEYWORDS);
  const [keywordInput, setKeywordInput] = useState("");

  const [standardFilters] = useState(
    STANDARD_FILTERS.map((filter) => ({
      ...filter,
      value:
        filter.id === "brand"
          ? identity.brand || filter.value
          : filter.id === "category"
            ? identity.category || filter.value
            : filter.value,
    }))
  );

  const [attributes, setAttributes] = useState(
    CONFIGURED_ATTRIBUTES
  );

  const [searchVisibility, setSearchVisibility] = useState("Visible");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const completedFilters = useMemo(() => {
    const standardCompleted = standardFilters.filter(
      (filter) => filter.value?.trim()
    ).length;

    const attributeCompleted = attributes.filter(
      (attribute) => attribute.value?.trim()
    ).length;

    return standardCompleted + attributeCompleted;
  }, [standardFilters, attributes]);

  const addKeyword = () => {
    const value = keywordInput.trim();

    if (!value) return;

    const exists = keywords.some(
      (keyword) => keyword.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      setKeywordInput("");
      return;
    }

    if (keywords.length >= 15) {
      setErrors((previous) => ({
        ...previous,
        keywords: "Maximum 15 search keywords are allowed.",
      }));
      return;
    }

    setKeywords((previous) => [...previous, value]);
    setKeywordInput("");

    setErrors((previous) => {
      const next = { ...previous };
      delete next.keywords;
      return next;
    });

    setSaved(false);
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords((previous) =>
      previous.filter((keyword) => keyword !== keywordToRemove)
    );

    setSaved(false);
  };

  const handleKeywordKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addKeyword();
    }
  };

  const updateAttribute = (attributeId, value) => {
    setAttributes((previous) =>
      previous.map((attribute) =>
        attribute.id === attributeId
          ? {
              ...attribute,
              value,
            }
          : attribute
      )
    );

    setSaved(false);
  };

  const validateBeforeContinue = () => {
    const nextErrors = {};

    standardFilters.forEach((filter) => {
      if (filter.required && !filter.value?.trim()) {
        nextErrors[filter.id] = `${filter.label} is required.`;
      }
    });

    if (keywords.length === 0) {
      nextErrors.keywords =
        "Add at least one search keyword.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const saveDraft = () => {
    const draft = {
      productIdentity: identity,
      standardFilters,
      configuredAttributes: attributes,
      searchKeywords: keywords,
      searchVisibility,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "arianiqs_product_search_filter_draft",
      JSON.stringify(draft)
    );

    setSaved(true);
  };

  const handleBack = () => {
    navigate("/products/documents", {
      state: {
        productIdentity: identity,
        productInformation,
        features,
        applications,
        includedItems,
        excludedItems,
        technicalSpecifications,
        images,
        documents,
      },
    });
  };

  const handleContinue = () => {
    if (!validateBeforeContinue()) {
      return;
    }

    navigate("/products/offer", {
      state: {
        productIdentity: identity,
        productInformation,
        features,
        applications,
        includedItems,
        excludedItems,
        technicalSpecifications,
        images,
        documents,
        searchFilterData: {
          standardFilters,
          configuredAttributes: attributes,
          searchKeywords: keywords,
          searchVisibility,
        },
      },
    });
  };

  return (
    <div className="product-search-filter-page">

      {/* HEADER */}
      <section className="search-filter-header">
        <div>
          <span className="search-filter-eyebrow">
            PRODUCT CREATION
          </span>

          <h1>Search & Filter Data</h1>

          <p>
            Prepare structured search keywords and filter information
            used to discover this product in the Arianiqs marketplace.
          </p>
        </div>

        <div className="search-filter-step-badge">
          STEP 8 OF 10
        </div>
      </section>

      {/* PROGRESS */}
      <div className="product-progress">

        {[
          "Identity",
          "Match Result",
          "Basic Information",
          "Features & Applications",
          "Technical Specifications",
          "Images",
          "Documents",
        ].map((label, index) => (
          <div
            className="progress-wrapper"
            key={label}
          >
            <div className="product-progress-step completed">
              <span className="progress-number">
                <CheckCircle2 size={15} />
              </span>

              <span className="progress-label">
                {label}
              </span>
            </div>

            <div className="product-progress-line active" />
          </div>
        ))}

        <div className="product-progress-step active">
          <span className="progress-number">8</span>

          <span className="progress-label">
            Search & Filter
          </span>
        </div>
      </div>

      {/* PRODUCT SUMMARY */}
      <section className="search-filter-summary">

        <div>
          <span>PRODUCT</span>
          <strong>{identity.productName}</strong>
        </div>

        <div>
          <span>BRAND</span>
          <strong>{identity.brand}</strong>
        </div>

        <div>
          <span>CATEGORY</span>
          <strong>{identity.category}</strong>
        </div>

        <div>
          <span>FILTER DATA</span>
          <strong>{completedFilters} configured</strong>
        </div>

      </section>

      <div className="search-filter-layout">

        <main className="search-filter-main">

          {/* STANDARD FILTERS */}
          <section className="search-filter-card">

            <div className="search-filter-card-header">
              <div className="search-filter-card-title">

                <div className="search-filter-icon">
                  <SlidersHorizontal size={19} />
                </div>

                <div>
                  <span>STANDARD FILTERS</span>
                  <h2>Product Classification</h2>
                </div>

              </div>

              <span className="controlled-badge">
                CONTROLLED
              </span>
            </div>

            <p className="card-description">
              These core filters are controlled by Arianiqs master
              data and form the foundation of marketplace discovery.
            </p>

            <div className="standard-filter-grid">

              {standardFilters.map((filter) => (
                <div
                  className="filter-field"
                  key={filter.id}
                >
                  <div className="filter-field-label">
                    <label>{filter.label}</label>

                    {filter.required && (
                      <span>Required</span>
                    )}
                  </div>

                  <div className="controlled-input">
                    <span>{filter.value || "Not configured"}</span>
                    <CheckCircle2 size={15} />
                  </div>

                  {errors[filter.id] && (
                    <small className="field-error">
                      {errors[filter.id]}
                    </small>
                  )}
                </div>
              ))}

            </div>
          </section>

          {/* SEARCH KEYWORDS */}
          <section className="search-filter-card">

            <div className="search-filter-card-header">
              <div className="search-filter-card-title">

                <div className="search-filter-icon">
                  <Search size={19} />
                </div>

                <div>
                  <span>SEARCH DISCOVERY</span>
                  <h2>Search Keywords</h2>
                </div>

              </div>

              <span className="keyword-counter">
                {keywords.length} / 15
              </span>
            </div>

            <p className="card-description">
              Add common product names, model references, abbreviations
              and relevant search terms customers may use.
            </p>

            <div className="keyword-input-area">

              <div className="keyword-input-row">

                <input
                  type="text"
                  value={keywordInput}
                  onChange={(event) =>
                    setKeywordInput(event.target.value)
                  }
                  onKeyDown={handleKeywordKeyDown}
                  placeholder="Type a keyword and press Enter..."
                />

                <button
                  type="button"
                  onClick={addKeyword}
                >
                  Add Keyword
                </button>

              </div>

              {errors.keywords && (
                <small className="field-error">
                  {errors.keywords}
                </small>
              )}

              <div className="keyword-list">

                {keywords.map((keyword) => (
                  <span
                    className="keyword-chip"
                    key={keyword}
                  >
                    <Tag size={12} />

                    {keyword}

                    <button
                      type="button"
                      onClick={() =>
                        removeKeyword(keyword)
                      }
                      aria-label={`Remove ${keyword}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

              </div>

            </div>
          </section>

          {/* CONFIGURED ATTRIBUTES */}
          <section className="search-filter-card">

            <div className="search-filter-card-header">
              <div className="search-filter-card-title">

                <div className="search-filter-icon">
                  <SlidersHorizontal size={19} />
                </div>

                <div>
                  <span>DYNAMIC ATTRIBUTES</span>
                  <h2>Filterable Product Attributes</h2>
                </div>

              </div>

              <span className="configured-badge">
                CONFIGURED
              </span>
            </div>

            <p className="card-description">
              These fields represent technical attributes configured
              by Arianiqs for the selected product category and type.
            </p>

            <div className="attribute-table">

              <div className="attribute-table-head">
                <span>ATTRIBUTE</span>
                <span>VALUE</span>
                <span>FILTER TYPE</span>
                <span>CUSTOMER FILTER</span>
              </div>

              {attributes.map((attribute) => (
                <div
                  className="attribute-row"
                  key={attribute.id}
                >
                  <div className="attribute-name">
                    <strong>{attribute.label}</strong>
                    <small>Configured attribute</small>
                  </div>

                  <input
                    type="text"
                    value={attribute.value}
                    onChange={(event) =>
                      updateAttribute(
                        attribute.id,
                        event.target.value
                      )
                    }
                  />

                  <span className="attribute-type">
                    {attribute.filterType}
                  </span>

                  <span className="filter-enabled">
                    <CheckCircle2 size={14} />
                    Enabled
                  </span>
                </div>
              ))}

            </div>
          </section>

          {/* VISIBILITY */}
          <section className="search-filter-card">

            <div className="search-filter-card-header">
              <div className="search-filter-card-title">

                <div className="search-filter-icon">
                  <Search size={19} />
                </div>

                <div>
                  <span>MARKETPLACE DISCOVERY</span>
                  <h2>Search Visibility</h2>
                </div>

              </div>
            </div>

            <div className="visibility-options">

              <label
                className={
                  searchVisibility === "Visible"
                    ? "visibility-option selected"
                    : "visibility-option"
                }
              >
                <input
                  type="radio"
                  name="visibility"
                  value="Visible"
                  checked={searchVisibility === "Visible"}
                  onChange={(event) =>
                    setSearchVisibility(event.target.value)
                  }
                />

                <div>
                  <strong>Searchable after approval</strong>

                  <span>
                    Product can participate in customer search once
                    Arianiqs approves the product.
                  </span>
                </div>
              </label>

              <label
                className={
                  searchVisibility === "Review"
                    ? "visibility-option selected"
                    : "visibility-option"
                }
              >
                <input
                  type="radio"
                  name="visibility"
                  value="Review"
                  checked={searchVisibility === "Review"}
                  onChange={(event) =>
                    setSearchVisibility(event.target.value)
                  }
                />

                <div>
                  <strong>Review required</strong>

                  <span>
                    Keep search visibility pending until Arianiqs
                    review is completed.
                  </span>
                </div>
              </label>

            </div>

          </section>

          {/* INFORMATION NOTE */}
          <div className="search-filter-info">

            <Info size={17} />

            <div>
              <strong>How search and filters work</strong>

              <p>
                Brand, Category and Type are standard marketplace
                filters. Additional technical filters are generated
                from Arianiqs-configured attributes. Vendor-entered
                keywords improve product discovery but do not create
                new taxonomy or filter definitions.
              </p>
            </div>

          </div>

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="search-filter-sidebar">

          <section className="sidebar-card">

            <div className="sidebar-card-header">
              <Search size={18} />
              <h3>Search Summary</h3>
            </div>

            <div className="summary-stat">
              <span>Keywords</span>
              <strong>{keywords.length}</strong>
            </div>

            <div className="summary-stat">
              <span>Standard Filters</span>
              <strong>{standardFilters.length}</strong>
            </div>

            <div className="summary-stat">
              <span>Technical Filters</span>
              <strong>{attributes.length}</strong>
            </div>

          </section>

          <section className="sidebar-card">

            <div className="sidebar-card-header">
              <SlidersHorizontal size={18} />
              <h3>Filter Structure</h3>
            </div>

            <div className="filter-structure">

              <div className="structure-item standard">
                <span>1</span>
                <div>
                  <strong>Standard</strong>
                  <small>
                    Brand / Category / Type
                  </small>
                </div>
              </div>

              <div className="structure-item">
                <span>2</span>
                <div>
                  <strong>Technical</strong>
                  <small>
                    Configured attributes
                  </small>
                </div>
              </div>

              <div className="structure-item">
                <span>3</span>
                <div>
                  <strong>Search</strong>
                  <small>
                    Vendor keywords
                  </small>
                </div>
              </div>

            </div>

          </section>

          <section className="sidebar-card">

            <div className="sidebar-card-header">
              <CheckCircle2 size={18} />
              <h3>Validation</h3>
            </div>

            <div className="validation-list">

              <div className="validation-item">
                <CheckCircle2 size={15} />
                <span>Product classification</span>
              </div>

              <div className="validation-item">
                <CheckCircle2 size={15} />
                <span>Search keywords</span>
              </div>

              <div className="validation-item">
                <CheckCircle2 size={15} />
                <span>Filter attributes</span>
              </div>

              <div className="validation-item">
                <CheckCircle2 size={15} />
                <span>Marketplace visibility</span>
              </div>

            </div>

          </section>

          <section className="sidebar-card workflow-card">

            <div className="sidebar-card-header">
              <CheckCircle2 size={18} />
              <h3>Production Workflow</h3>
            </div>

            <div className="workflow-list">

              <div className="workflow-item completed">
                <span>✓</span>
                <div>
                  <strong>Product Documents</strong>
                  <small>Completed</small>
                </div>
              </div>

              <div className="workflow-item active">
                <span>8</span>
                <div>
                  <strong>Search & Filter</strong>
                  <small>Current step</small>
                </div>
              </div>

              <div className="workflow-item">
                <span>9</span>
                <div>
                  <strong>Commercial Offer</strong>
                  <small>Next</small>
                </div>
              </div>

              <div className="workflow-item">
                <span>10</span>
                <div>
                  <strong>Review & Preview</strong>
                  <small>Later</small>
                </div>
              </div>

            </div>

          </section>

        </aside>
      </div>

      {/* ACTION BAR */}
      <div className="search-filter-action-bar">

        <button
          type="button"
          className="action-button secondary"
          onClick={handleBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="action-right">

          {saved && (
            <span className="draft-saved">
              <CheckCircle2 size={15} />
              Draft saved
            </span>
          )}

          <button
            type="button"
            className="action-button draft"
            onClick={saveDraft}
          >
            Save Draft
          </button>

          <button
            type="button"
            className="action-button primary"
            onClick={handleContinue}
          >
            Continue to Commercial Offer
            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductSearchFilter;