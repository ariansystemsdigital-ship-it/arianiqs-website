import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Package,
  Send,
} from "lucide-react";
import "./SubmitQuote.css";

const rfqRecords = {
  "RFQ-000241": {
    id: "RFQ-000241",
    product: "SIMATIC S7-1200 CPU 1214C",
    mpn: "6ES7214-1AG40-0XB0",
    quantity: 5,
    deliveryNeed: "10 Days",
    status: "OPEN",
  },

  "RFQ-000240": {
    id: "RFQ-000240",
    product: "Modicon M221 PLC",
    mpn: "TM221CE24R",
    quantity: 10,
    deliveryNeed: "14 Days",
    status: "OPEN",
  },

  "RFQ-000239": {
    id: "RFQ-000239",
    product: "ABB ACS355 Drive",
    mpn: "ACS355-03E-08A8-4",
    quantity: 3,
    deliveryNeed: "7 Days",
    status: "QUOTED",
  },

  "RFQ-000238": {
    id: "RFQ-000238",
    product: "Omron CJ2M CPU",
    mpn: "CJ2M-CPU33",
    quantity: 2,
    deliveryNeed: "12 Days",
    status: "UNDER_REVIEW",
  },

  "RFQ-000237": {
    id: "RFQ-000237",
    product: "SCALANCE XC208",
    mpn: "SCALANCE XC208",
    quantity: 4,
    deliveryNeed: "15 Days",
    status: "EXPIRED",
  },
};

function SubmitQuote() {
  const navigate = useNavigate();
  const { rfqId } = useParams();

  const rfq = rfqRecords[rfqId];

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(rfq?.quantity || "");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [validityDays, setValidityDays] = useState("");
  const [terms, setTerms] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalValue = useMemo(() => {
    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericPrice) ||
      !Number.isFinite(numericQuantity) ||
      numericPrice <= 0 ||
      numericQuantity <= 0
    ) {
      return null;
    }

    return numericPrice * numericQuantity;
  }, [price, quantity]);

  if (!rfq) {
    return (
      <div className="submit-quote-page">
        <button
          type="button"
          className="quote-back-button"
          onClick={() => navigate("/rfqs")}
        >
          <ArrowLeft size={17} />
          Back to RFQs
        </button>

        <div className="quote-not-found">
          <FileText size={38} />
          <h2>RFQ not found</h2>
          <p>
            The requested RFQ could not be found in the current vendor portal
            data.
          </p>
        </div>
      </div>
    );
  }

  const canSubmit = rfq.status === "OPEN";

  const validateForm = () => {
    const newErrors = {};

    if (!price || Number(price) <= 0) {
      newErrors.price = "Enter a valid unit price.";
    }

    if (!quantity || Number(quantity) <= 0) {
      newErrors.quantity = "Enter a valid quantity.";
    }

    if (!deliveryDays || Number(deliveryDays) <= 0) {
      newErrors.deliveryDays = "Enter delivery days.";
    }

    if (!validityDays || Number(validityDays) <= 0) {
      newErrors.validityDays = "Enter quote validity.";
    }

    if (!terms.trim()) {
      newErrors.terms = "Enter the commercial terms.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    /*
      Frontend workflow only.

      The actual production implementation will submit this data
      to the ARIANIQS backend API, where authentication,
      authorization, validation, business rules and database
      persistence will be enforced.
    */

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (submitted) {
    return (
      <div className="submit-quote-page">
        <div className="quote-success-card">
          <div className="quote-success-icon">
            <CheckCircle2 size={42} />
          </div>

          <h1>Quote Submitted</h1>

          <p>
            Your quote response has been prepared successfully for{" "}
            <strong>{rfq.id}</strong>.
          </p>

          <div className="submitted-summary">
            <div>
              <span>RFQ</span>
              <strong>{rfq.id}</strong>
            </div>

            <div>
              <span>Product</span>
              <strong>{rfq.product}</strong>
            </div>

            <div>
              <span>Quantity</span>
              <strong>{quantity}</strong>
            </div>

            <div>
              <span>Unit Price</span>
              <strong>₹ {Number(price).toLocaleString("en-IN")}</strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>{deliveryDays} Days</strong>
            </div>

            <div>
              <span>Validity</span>
              <strong>{validityDays} Days</strong>
            </div>
          </div>

          <div className="success-note">
            <FileText size={17} />

            <p>
              This frontend currently demonstrates the vendor quote workflow.
              Actual quote creation, persistence, customer visibility and
              acceptance will be handled by the ARIANIQS backend.
            </p>
          </div>

          <div className="success-actions">
            <button
              type="button"
              className="secondary-quote-button"
              onClick={() => navigate(`/rfqs/${rfq.id}`)}
            >
              Back to RFQ
            </button>

            <button
              type="button"
              className="primary-quote-button"
              onClick={() => navigate("/quotes")}
            >
              View Quotes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-quote-page">
      {/* TOP */}
      <div className="quote-topbar">
        <button
          type="button"
          className="quote-back-button"
          onClick={() => navigate(`/rfqs/${rfq.id}`)}
        >
          <ArrowLeft size={17} />
          Back to RFQ
        </button>

        <span className="quote-page-step">RFQ RESPONSE</span>
      </div>

      {/* HEADER */}
      <div className="quote-page-header">
        <div>
          <div className="quote-breadcrumb">
            Vendor Portal / RFQs / {rfq.id} / Submit Quote
          </div>

          <h1>Submit Quote</h1>

          <p>
            Provide your commercial response for the customer RFQ.
          </p>
        </div>
      </div>

      {/* RFQ SUMMARY */}
      <div className="quote-rfq-summary">
        <div className="summary-product-icon">
          <Package size={21} />
        </div>

        <div className="summary-product-content">
          <span>{rfq.id}</span>
          <strong>{rfq.product}</strong>
          <small>MPN: {rfq.mpn}</small>
        </div>

        <div className="summary-request">
          <span>Requested Quantity</span>
          <strong>{rfq.quantity}</strong>
        </div>

        <div className="summary-request">
          <span>Delivery Need</span>
          <strong>{rfq.deliveryNeed}</strong>
        </div>
      </div>

      {/* FORM */}
      {!canSubmit ? (
        <div className="quote-closed-card">
          <FileText size={28} />

          <h2>Quote response unavailable</h2>

          <p>
            This RFQ is currently{" "}
            <strong>{rfq.status.replaceAll("_", " ")}</strong> and cannot
            receive a new quote response.
          </p>

          <button
            type="button"
            className="primary-quote-button"
            onClick={() => navigate(`/rfqs/${rfq.id}`)}
          >
            Return to RFQ
          </button>
        </div>
      ) : (
        <form className="quote-form" onSubmit={handleSubmit}>
          {/* COMMERCIAL DETAILS */}
          <section className="quote-form-card">
            <div className="quote-section-heading">
              <div className="quote-section-icon">
                <Package size={18} />
              </div>

              <div>
                <h2>Commercial Details</h2>
                <p>Enter the pricing and quantity for your response.</p>
              </div>
            </div>

            <div className="quote-form-grid">
              {/* UNIT PRICE */}
              <div className="quote-field">
                <label>
                  Unit Price <span>*</span>
                </label>

                <div className="price-input-wrapper">
                  <div className="currency-symbol">₹</div>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter unit price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>

                {errors.price && (
                  <small className="field-error">
                    {errors.price}
                  </small>
                )}
              </div>

              {/* QUANTITY */}
              <div className="quote-field">
                <label>
                  Quantity <span>*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder={`Requested: ${rfq.quantity}`}
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />

                {errors.quantity && (
                  <small className="field-error">
                    {errors.quantity}
                  </small>
                )}
              </div>

              {/* DELIVERY DAYS */}
              <div className="quote-field">
                <label>
                  Delivery Days <span>*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  value={deliveryDays}
                  onChange={(event) =>
                    setDeliveryDays(event.target.value)
                  }
                />

                {errors.deliveryDays && (
                  <small className="field-error">
                    {errors.deliveryDays}
                  </small>
                )}
              </div>

              {/* QUOTE VALIDITY */}
              <div className="quote-field">
                <label>
                  Quote Validity <span>*</span>
                </label>

                <div className="input-with-suffix">
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 30"
                    value={validityDays}
                    onChange={(event) =>
                      setValidityDays(event.target.value)
                    }
                  />

                  <span>Days</span>
                </div>

                {errors.validityDays && (
                  <small className="field-error">
                    {errors.validityDays}
                  </small>
                )}
              </div>
            </div>

            {totalValue !== null && (
              <div className="quote-total">
                <span>Estimated Quote Value</span>

                <strong>
                  ₹ {totalValue.toLocaleString("en-IN")}
                </strong>
              </div>
            )}
          </section>

          {/* TERMS */}
          <section className="quote-form-card">
            <div className="quote-section-heading">
              <div className="quote-section-icon">
                <FileText size={18} />
              </div>

              <div>
                <h2>Commercial Terms</h2>
                <p>Provide the terms applicable to your quote.</p>
              </div>
            </div>

            <div className="quote-field full-field">
              <label>
                Terms & Conditions <span>*</span>
              </label>

              <textarea
                rows="5"
                maxLength="1000"
                placeholder="Enter applicable commercial terms..."
                value={terms}
                onChange={(event) => setTerms(event.target.value)}
              />

              <div className="field-counter">
                {terms.length}/1000
              </div>

              {errors.terms && (
                <small className="field-error">
                  {errors.terms}
                </small>
              )}
            </div>
          </section>

          {/* NOTES */}
          <section className="quote-form-card">
            <div className="quote-section-heading">
              <div className="quote-section-icon">
                <FileText size={18} />
              </div>

              <div>
                <h2>Notes</h2>
                <p>
                  Add any additional information relevant to the response.
                </p>
              </div>
            </div>

            <div className="quote-field full-field">
              <label>Notes</label>

              <textarea
                rows="5"
                maxLength="1000"
                placeholder="Enter additional notes..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />

              <div className="field-counter">
                {notes.length}/1000
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="quote-form-actions">
            <button
              type="button"
              className="secondary-quote-button"
              onClick={() => navigate(`/rfqs/${rfq.id}`)}
            >
              Cancel
            </button>

            <button type="submit" className="primary-quote-button">
              <Send size={17} />
              Submit Quote
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SubmitQuote;