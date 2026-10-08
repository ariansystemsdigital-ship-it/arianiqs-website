import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Package,
  ShieldCheck,
  Clock3,
  RotateCcw,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VendorCommercialOffer.css";

const PRODUCT_WORKFLOW_STORAGE_KEY =
  "arianiqs_product_creation_workflow";

const CURRENCY_OPTIONS = ["INR", "USD", "EUR"];

const WARRANTY_TYPES = [
  "Manufacturer Warranty",
  "Vendor Warranty",
  "No Warranty",
];

const WARRANTY_UNITS = ["Months", "Years"];

const LEAD_TIME_UNITS = ["Days", "Weeks"];

function VendorCommercialOffer() {
  const navigate = useNavigate();
  const location = useLocation();

  const workflow = location.state || {};

  const productIdentity = workflow.productIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    productType: "PLC",
    mpn: "6ES7-215-1AG40-0XB0",
  };

  const productInformation = workflow.productInformation || {
    productName: "Siemens SIMATIC S7-1200 CPU 1215C",
  };

  const [form, setForm] = useState({
    vendorSku: "",
    sellingPrice: "",
    currency: "INR",
    stockQuantity: "",
    moq: "1",
    leadTimeValue: "3",
    leadTimeUnit: "Days",
    warrantyType: "Manufacturer Warranty",
    warrantyPeriod: "12",
    warrantyUnit: "Months",
    returnEligible: "Yes",
    offerNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setSaved(false);
  };

  const productCode = "ARQ-P-000125";

  const formattedPrice = useMemo(() => {
    const numericValue = Number(form.sellingPrice);

    if (!numericValue || numericValue < 0) {
      return "₹0.00";
    }

    if (form.currency === "INR") {
      return `₹${numericValue.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    return `${form.currency} ${numericValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [form.sellingPrice, form.currency]);

  const validate = () => {
    const nextErrors = {};

    if (
      form.sellingPrice === "" ||
      Number(form.sellingPrice) <= 0
    ) {
      nextErrors.sellingPrice = "Selling price is required.";
    }

    if (
      form.stockQuantity === "" ||
      Number(form.stockQuantity) < 0
    ) {
      nextErrors.stockQuantity =
        "Stock quantity is required.";
    }

    if (
      form.moq === "" ||
      Number(form.moq) <= 0
    ) {
      nextErrors.moq = "MOQ must be at least 1.";
    }

    if (
      form.leadTimeValue === "" ||
      Number(form.leadTimeValue) < 0
    ) {
      nextErrors.leadTimeValue =
        "Lead time is required.";
    }

    if (
      Number(form.moq) > Number(form.stockQuantity) &&
      form.stockQuantity !== ""
    ) {
      nextErrors.moq =
        "MOQ cannot be greater than available stock.";
    }

    if (
      form.warrantyType !== "No Warranty" &&
      (!form.warrantyPeriod ||
        Number(form.warrantyPeriod) <= 0)
    ) {
      nextErrors.warrantyPeriod =
        "Warranty period is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /*
    ============================================================
    COMPLETE PRODUCT WORKFLOW STATE
    ============================================================
    Everything received from V-01 -> V-08 is preserved.
    V-09 adds the commercial offer.
  */
  const buildWorkflowState = () => ({
    ...workflow,

    productIdentity,
    productInformation,

    commercialOffer: {
      ...form,
    },

    productCode,

    savedAt: new Date().toISOString(),
  });

  /*
    ============================================================
    SAVE COMPLETE WORKFLOW
    ============================================================
  */
  const saveCompleteWorkflow = (workflowData) => {
    try {
      localStorage.setItem(
        PRODUCT_WORKFLOW_STORAGE_KEY,
        JSON.stringify(workflowData)
      );

      return true;
    } catch (error) {
      console.error(
        "Failed to save product creation workflow:",
        error
      );

      return false;
    }
  };

  /*
    ============================================================
    SAVE DRAFT
    ============================================================
  */
  const handleSaveDraft = () => {
    const workflowData = buildWorkflowState();

    // Save COMPLETE workflow
    saveCompleteWorkflow(workflowData);

    // Keep existing V-09 draft storage
    localStorage.setItem(
      "arianiqs_vendor_commercial_offer_draft",
      JSON.stringify({
        ...form,
        productCode,
        productIdentity,
        savedAt: new Date().toISOString(),
      })
    );

    setSaved(true);
  };

  /*
    ============================================================
    CONTINUE TO V-10
    ============================================================
  */
  const handleContinue = () => {
    if (!validate()) {
      return;
    }

    const workflowData = buildWorkflowState();

    // IMPORTANT:
    // Persist the complete V-01 -> V-09 workflow
    // before opening V-10.
    saveCompleteWorkflow(workflowData);

    navigate("/products/review", {
      state: workflowData,
    });
  };

  const handleBack = () => {
    navigate("/products/search-filter", {
      state: workflow,
    });
  };

  const progressSteps = [
    { number: 1, label: "Identity", completed: true },
    { number: 2, label: "Match Result", completed: true },
    { number: 3, label: "Basic Information", completed: true },
    {
      number: 4,
      label: "Features & Applications",
      completed: true,
    },
    {
      number: 5,
      label: "Technical Specifications",
      completed: true,
    },
    { number: 6, label: "Images", completed: true },
    { number: 7, label: "Documents", completed: true },
    {
      number: 8,
      label: "Search & Filter",
      completed: true,
    },
    {
      number: 9,
      label: "Commercial Offer",
      active: true,
    },
    {
      number: 10,
      label: "Review & Preview",
    },
  ];

  return (
    <div className="commercial-offer-page">
      <section className="commercial-offer-header">
        <div>
          <div className="commercial-eyebrow">
            PRODUCT CREATION
          </div>

          <h1>Vendor Commercial Offer</h1>

          <p>
            Add your commercial terms for this Arianiqs
            product listing.
          </p>
        </div>

        <div className="commercial-step-badge">
          STEP 9 OF 10
        </div>
      </section>

      <div className="commercial-progress">
        {progressSteps.map((step, index) => (
          <div
            className="commercial-progress-group"
            key={step.number}
          >
            <div
              className={[
                "commercial-progress-step",
                step.completed ? "completed" : "",
                step.active ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="progress-number">
                {step.completed ? (
                  <CheckCircle2 size={15} />
                ) : (
                  step.number
                )}
              </span>

              <span className="progress-label">
                {step.label}
              </span>
            </div>

            {index < progressSteps.length - 1 && (
              <span
                className={[
                  "commercial-progress-line",
                  step.completed ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </div>
        ))}
      </div>

      <section className="commercial-product-summary">
        <div className="summary-product-icon">
          <Package size={24} />
        </div>

        <div className="summary-product-content">
          <div className="summary-label">
            ARIANIQS MASTER PRODUCT
          </div>

          <h2>
            {productInformation.productName ||
              "Siemens SIMATIC S7-1200 CPU 1215C"}
          </h2>

          <div className="summary-meta">
            <span>
              <strong>Code:</strong> {productCode}
            </span>

            <span>
              <strong>Brand:</strong>{" "}
              {productIdentity.brand}
            </span>

            <span>
              <strong>Category:</strong>{" "}
              {productIdentity.category}
            </span>

            <span>
              <strong>Type:</strong>{" "}
              {productIdentity.productType}
            </span>

            <span>
              <strong>MPN:</strong>{" "}
              {productIdentity.mpn}
            </span>
          </div>
        </div>

        <div className="master-product-status">
          <CheckCircle2 size={16} />
          Master Product
        </div>
      </section>

      <div className="commercial-layout">
        <main className="commercial-main">
          <section className="commercial-card">
            <div className="commercial-card-header">
              <div className="commercial-card-icon">
                <CircleDollarSign size={19} />
              </div>

              <div>
                <h2>Pricing & Stock</h2>
                <p>
                  Enter the commercial values controlled by
                  your vendor account.
                </p>
              </div>
            </div>

            <div className="commercial-form-grid">
              <div className="commercial-field">
                <label>
                  Vendor SKU
                  <span className="optional">Optional</span>
                </label>

                <input
                  type="text"
                  value={form.vendorSku}
                  maxLength={100}
                  placeholder="e.g. SI-1215C-01"
                  onChange={(event) =>
                    updateField(
                      "vendorSku",
                      event.target.value
                    )
                  }
                />

                <small>
                  Your internal product reference.
                </small>
              </div>

              <div className="commercial-field">
                <label>
                  Selling Price{" "}
                  <span className="required">*</span>
                </label>

                <div className="input-with-prefix">
                  <span className="input-prefix">
                    {form.currency === "INR"
                      ? "₹"
                      : form.currency}
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.sellingPrice}
                    placeholder="45000.00"
                    onChange={(event) =>
                      updateField(
                        "sellingPrice",
                        event.target.value
                      )
                    }
                  />
                </div>

                {errors.sellingPrice && (
                  <div className="field-error">
                    {errors.sellingPrice}
                  </div>
                )}
              </div>

              <div className="commercial-field">
                <label>
                  Currency{" "}
                  <span className="required">*</span>
                </label>

                <select
                  value={form.currency}
                  onChange={(event) =>
                    updateField(
                      "currency",
                      event.target.value
                    )
                  }
                >
                  {CURRENCY_OPTIONS.map((currency) => (
                    <option
                      key={currency}
                      value={currency}
                    >
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="commercial-field">
                <label>
                  Stock Quantity{" "}
                  <span className="required">*</span>
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stockQuantity}
                  placeholder="5"
                  onChange={(event) =>
                    updateField(
                      "stockQuantity",
                      event.target.value
                    )
                  }
                />

                {errors.stockQuantity && (
                  <div className="field-error">
                    {errors.stockQuantity}
                  </div>
                )}
              </div>

              <div className="commercial-field">
                <label>
                  Minimum Order Quantity{" "}
                  <span className="required">*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={form.moq}
                  placeholder="1"
                  onChange={(event) =>
                    updateField(
                      "moq",
                      event.target.value
                    )
                  }
                />

                {errors.moq && (
                  <div className="field-error">
                    {errors.moq}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="commercial-card">
            <div className="commercial-card-header">
              <div className="commercial-card-icon">
                <Clock3 size={19} />
              </div>

              <div>
                <h2>Lead Time</h2>
                <p>
                  Define how quickly the vendor can fulfill
                  the order.
                </p>
              </div>
            </div>

            <div className="commercial-form-grid">
              <div className="commercial-field">
                <label>
                  Lead Time{" "}
                  <span className="required">*</span>
                </label>

                <div className="compound-input">
                  <input
                    type="number"
                    min="0"
                    value={form.leadTimeValue}
                    onChange={(event) =>
                      updateField(
                        "leadTimeValue",
                        event.target.value
                      )
                    }
                  />

                  <select
                    value={form.leadTimeUnit}
                    onChange={(event) =>
                      updateField(
                        "leadTimeUnit",
                        event.target.value
                      )
                    }
                  >
                    {LEAD_TIME_UNITS.map((unit) => (
                      <option
                        key={unit}
                        value={unit}
                      >
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.leadTimeValue && (
                  <div className="field-error">
                    {errors.leadTimeValue}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="commercial-card">
            <div className="commercial-card-header">
              <div className="commercial-card-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2>Warranty</h2>
                <p>
                  Specify the warranty commitment attached
                  to this offer.
                </p>
              </div>
            </div>

            <div className="commercial-form-grid">
              <div className="commercial-field">
                <label>
                  Warranty Type
                  <span className="optional">
                    Optional
                  </span>
                </label>

                <select
                  value={form.warrantyType}
                  onChange={(event) =>
                    updateField(
                      "warrantyType",
                      event.target.value
                    )
                  }
                >
                  {WARRANTY_TYPES.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {form.warrantyType !== "No Warranty" && (
                <div className="commercial-field">
                  <label>
                    Warranty Period
                    <span className="optional">
                      Optional
                    </span>
                  </label>

                  <div className="compound-input">
                    <input
                      type="number"
                      min="1"
                      value={form.warrantyPeriod}
                      onChange={(event) =>
                        updateField(
                          "warrantyPeriod",
                          event.target.value
                        )
                      }
                    />

                    <select
                      value={form.warrantyUnit}
                      onChange={(event) =>
                        updateField(
                          "warrantyUnit",
                          event.target.value
                        )
                      }
                    >
                      {WARRANTY_UNITS.map((unit) => (
                        <option
                          key={unit}
                          value={unit}
                        >
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  {errors.warrantyPeriod && (
                    <div className="field-error">
                      {errors.warrantyPeriod}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="commercial-card">
            <div className="commercial-card-header">
              <div className="commercial-card-icon">
                <RotateCcw size={19} />
              </div>

              <div>
                <h2>Return Policy</h2>
                <p>
                  Specify whether this commercial offer
                  supports returns.
                </p>
              </div>
            </div>

            <div className="return-options">
              <button
                type="button"
                className={
                  form.returnEligible === "Yes"
                    ? "return-option selected"
                    : "return-option"
                }
                onClick={() =>
                  updateField("returnEligible", "Yes")
                }
              >
                <span className="radio-circle">
                  {form.returnEligible === "Yes" && (
                    <span />
                  )}
                </span>

                <span>
                  <strong>Return Eligible</strong>
                  <small>
                    Customers may return the product
                    according to the applicable policy.
                  </small>
                </span>
              </button>

              <button
                type="button"
                className={
                  form.returnEligible === "No"
                    ? "return-option selected"
                    : "return-option"
                }
                onClick={() =>
                  updateField("returnEligible", "No")
                }
              >
                <span className="radio-circle">
                  {form.returnEligible === "No" && (
                    <span />
                  )}
                </span>

                <span>
                  <strong>Not Return Eligible</strong>
                  <small>
                    Returns are not supported for this offer.
                  </small>
                </span>
              </button>
            </div>
          </section>

          <section className="commercial-card">
            <div className="commercial-card-header">
              <div className="commercial-card-icon">
                <Info size={19} />
              </div>

              <div>
                <h2>Offer Notes</h2>
                <p>
                  Add additional commercial information for
                  Arianiqs review.
                </p>
              </div>
            </div>

            <div className="commercial-field full-width">
              <label>
                Offer Notes
                <span className="optional">Optional</span>
              </label>

              <textarea
                rows="5"
                maxLength={1000}
                value={form.offerNotes}
                placeholder="Additional commercial information..."
                onChange={(event) =>
                  updateField(
                    "offerNotes",
                    event.target.value
                  )
                }
              />

              <div className="character-count">
                {form.offerNotes.length} / 1000
              </div>
            </div>
          </section>
        </main>

        <aside className="commercial-sidebar">
          <div className="commercial-side-card">
            <div className="side-card-title">
              <CircleDollarSign size={17} />
              Offer Summary
            </div>

            <div className="offer-price-preview">
              <span>SELLING PRICE</span>
              <strong>{formattedPrice}</strong>
            </div>

            <div className="summary-row">
              <span>Stock</span>
              <strong>
                {form.stockQuantity || "—"}
              </strong>
            </div>

            <div className="summary-row">
              <span>MOQ</span>
              <strong>{form.moq || "—"}</strong>
            </div>

            <div className="summary-row">
              <span>Lead Time</span>
              <strong>
                {form.leadTimeValue || "—"}{" "}
                {form.leadTimeUnit}
              </strong>
            </div>

            <div className="summary-row">
              <span>Warranty</span>
              <strong>
                {form.warrantyType === "No Warranty"
                  ? "No Warranty"
                  : `${form.warrantyPeriod} ${form.warrantyUnit}`}
              </strong>
            </div>

            <div className="summary-row">
              <span>Returns</span>
              <strong>
                {form.returnEligible === "Yes"
                  ? "Eligible"
                  : "Not Eligible"}
              </strong>
            </div>
          </div>

          <div className="commercial-side-card">
            <div className="side-card-title">
              <CheckCircle2 size={17} />
              Validation
            </div>

            <div className="validation-item">
              <CheckCircle2 size={15} />
              <span>
                Product identity linked
              </span>
            </div>

            <div
              className={
                form.sellingPrice &&
                Number(form.sellingPrice) > 0
                  ? "validation-item"
                  : "validation-item pending"
              }
            >
              {form.sellingPrice &&
              Number(form.sellingPrice) > 0 ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertTriangle size={15} />
              )}

              <span>Price entered</span>
            </div>

            <div
              className={
                form.stockQuantity !== "" &&
                Number(form.stockQuantity) >= 0
                  ? "validation-item"
                  : "validation-item pending"
              }
            >
              {form.stockQuantity !== "" &&
              Number(form.stockQuantity) >= 0 ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertTriangle size={15} />
              )}

              <span>Stock quantity entered</span>
            </div>

            <div className="validation-item">
              <CheckCircle2 size={15} />
              <span>Commercial fields ready</span>
            </div>
          </div>

          <div className="commercial-side-card workflow-card">
            <div className="side-card-title">
              Workflow
            </div>

            <div className="workflow-step completed">
              <span>✓</span>
              Search & Filter
            </div>

            <div className="workflow-step active">
              <span>9</span>
              Commercial Offer
            </div>

            <div className="workflow-step">
              <span>10</span>
              Review & Preview
            </div>

            <div className="workflow-step">
              <span>11</span>
              Submit for Review
            </div>
          </div>
        </aside>
      </div>

      <div className="commercial-action-bar">
        <button
          type="button"
          className="commercial-button secondary"
          onClick={handleBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="commercial-action-right">
          {saved && (
            <span className="draft-saved">
              <CheckCircle2 size={16} />
              Draft saved
            </span>
          )}

          <button
            type="button"
            className="commercial-button secondary"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>

          <button
            type="button"
            className="commercial-button primary"
            onClick={handleContinue}
          >
            Continue to Review
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="commercial-footer-note">
        <Info size={15} />
        Commercial information belongs to the vendor offer.
        It does not modify the Arianiqs master product.
      </div>
    </div>
  );
}

export default VendorCommercialOffer;