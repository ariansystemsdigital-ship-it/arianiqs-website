import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Package,
  Send,
  UserRound,
} from "lucide-react";
import "./RFQDetails.css";

const rfqRecords = {
  "RFQ-000241": {
    id: "RFQ-000241",
    product: "SIMATIC S7-1200 CPU 1214C",
    mpn: "6ES7214-1AG40-0XB0",
    quantity: 5,
    deliveryNeed: "10 Days",
    submitted: "07 Oct 2026",
    status: "OPEN",
    customer: "Customer RFQ",
    requirements:
      "PLC controller required for an industrial automation application.",
    notes:
      "Customer has requested a new condition product with suitable commercial terms and delivery commitment.",
  },

  "RFQ-000240": {
    id: "RFQ-000240",
    product: "Modicon M221 PLC",
    mpn: "TM221CE24R",
    quantity: 10,
    deliveryNeed: "14 Days",
    submitted: "07 Oct 2026",
    status: "OPEN",
    customer: "Customer RFQ",
    requirements:
      "New condition PLC with standard warranty.",
    notes:
      "Vendor should provide availability and expected delivery timeline.",
  },

  "RFQ-000239": {
    id: "RFQ-000239",
    product: "ABB ACS355 Drive",
    mpn: "ACS355-03E-08A8-4",
    quantity: 3,
    deliveryNeed: "7 Days",
    submitted: "06 Oct 2026",
    status: "QUOTED",
    customer: "Customer RFQ",
    requirements:
      "Variable frequency drive for motor control application.",
    notes:
      "A quote has already been submitted for this RFQ.",
  },

  "RFQ-000238": {
    id: "RFQ-000238",
    product: "Omron CJ2M CPU",
    mpn: "CJ2M-CPU33",
    quantity: 2,
    deliveryNeed: "12 Days",
    submitted: "06 Oct 2026",
    status: "UNDER_REVIEW",
    customer: "Customer RFQ",
    requirements:
      "CPU module required with suitable accessories.",
    notes:
      "The RFQ is currently under review.",
  },

  "RFQ-000237": {
    id: "RFQ-000237",
    product: "SCALANCE XC208",
    mpn: "SCALANCE XC208",
    quantity: 4,
    deliveryNeed: "15 Days",
    submitted: "05 Oct 2026",
    status: "EXPIRED",
    customer: "Customer RFQ",
    requirements:
      "Industrial Ethernet switch.",
    notes:
      "This RFQ has passed its active response period.",
  },
};

function RFQDetails() {
  const navigate = useNavigate();
  const { rfqId } = useParams();

  const rfq = rfqRecords[rfqId];

  if (!rfq) {
    return (
      <div className="rfq-details-page">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/rfqs")}
        >
          <ArrowLeft size={17} />
          Back to RFQs
        </button>

        <div className="rfq-not-found">
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

  const canQuote = rfq.status === "OPEN";

  return (
    <div className="rfq-details-page">
      {/* TOP BAR */}
      <div className="details-topbar">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/rfqs")}
        >
          <ArrowLeft size={17} />
          Back to RFQs
        </button>

        <span className={`details-status ${rfq.status.toLowerCase()}`}>
          {rfq.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* HEADER */}
      <div className="details-header">
        <div>
          <div className="details-breadcrumb">
            Vendor Portal / RFQs / {rfq.id}
          </div>

          <h1>{rfq.id}</h1>

          <p>
            Review the customer request and submit a quote if your vendor
            account is eligible to respond.
          </p>
        </div>

        {canQuote && (
          <button
            className="submit-quote-header-button"
            type="button"
            onClick={() => navigate(`/rfqs/${rfq.id}/quote`)}
          >
            <Send size={17} />
            Submit Quote
          </button>
        )}
      </div>

      {/* MAIN GRID */}
      <div className="details-grid">
        {/* PRODUCT CARD */}
        <section className="details-card product-card">
          <div className="details-card-heading">
            <div className="heading-icon">
              <Package size={19} />
            </div>

            <div>
              <h2>Product Information</h2>
              <p>Requested product details</p>
            </div>
          </div>

          <div className="product-details">
            <div className="product-main">
              <span>Product</span>
              <strong>{rfq.product}</strong>
            </div>

            <div className="product-main">
              <span>Manufacturer Part Number</span>
              <strong>{rfq.mpn}</strong>
            </div>
          </div>
        </section>

        {/* RFQ INFORMATION */}
        <section className="details-card">
          <div className="details-card-heading">
            <div className="heading-icon">
              <FileText size={19} />
            </div>

            <div>
              <h2>RFQ Information</h2>
              <p>Request details and response requirements</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span>Requested Quantity</span>
              <strong>{rfq.quantity}</strong>
            </div>

            <div className="info-item">
              <span>Delivery Need</span>
              <strong>{rfq.deliveryNeed}</strong>
            </div>

            <div className="info-item">
              <span>Submitted Date</span>
              <strong>{rfq.submitted}</strong>
            </div>

            <div className="info-item">
              <span>Source</span>
              <strong>{rfq.customer}</strong>
            </div>
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section className="details-card full-width">
          <div className="details-card-heading">
            <div className="heading-icon">
              <FileText size={19} />
            </div>

            <div>
              <h2>Customer Requirements</h2>
              <p>Requirements received with this RFQ</p>
            </div>
          </div>

          <div className="requirements-box">
            <strong>Requirement</strong>
            <p>{rfq.requirements}</p>
          </div>

          <div className="requirements-box">
            <strong>Additional Notes</strong>
            <p>{rfq.notes}</p>
          </div>
        </section>

        {/* RESPONSE WINDOW */}
        <section className="details-card">
          <div className="details-card-heading">
            <div className="heading-icon">
              <Clock3 size={19} />
            </div>

            <div>
              <h2>Response</h2>
              <p>Vendor response action</p>
            </div>
          </div>

          {canQuote ? (
            <div className="response-ready">
              <div className="response-icon">
                <Send size={20} />
              </div>

              <div>
                <strong>Quote response available</strong>
                <p>
                  You can submit a quote for this open RFQ.
                </p>
              </div>
            </div>
          ) : (
            <div className="response-unavailable">
              <strong>Quote response unavailable</strong>
              <p>
                This RFQ is currently {rfq.status.replaceAll("_", " ").toLowerCase()}.
              </p>
            </div>
          )}
        </section>

        {/* WORKFLOW */}
        <section className="details-card">
          <div className="details-card-heading">
            <div className="heading-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <h2>RFQ Workflow</h2>
              <p>Current request lifecycle</p>
            </div>
          </div>

          <div className="workflow">
            <div className="workflow-step completed">
              <span>1</span>
              <div>
                <strong>RFQ Received</strong>
                <small>Customer request received</small>
              </div>
            </div>

            <div
              className={`workflow-line ${
                rfq.status !== "OPEN" ? "active" : ""
              }`}
            />

            <div
              className={`workflow-step ${
                rfq.status !== "OPEN" ? "completed" : "current"
              }`}
            >
              <span>2</span>
              <div>
                <strong>Vendor Response</strong>
                <small>Quote submission</small>
              </div>
            </div>

            <div className="workflow-line" />

            <div className="workflow-step">
              <span>3</span>
              <div>
                <strong>Customer Review</strong>
                <small>Quote review and decision</small>
              </div>
            </div>

            <div className="workflow-line" />

            <div className="workflow-step">
              <span>4</span>
              <div>
                <strong>Order</strong>
                <small>Created after accepted quote</small>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* BOTTOM ACTION */}
      {canQuote && (
        <div className="details-action-bar">
          <div>
            <strong>Ready to respond?</strong>
            <p>
              Submit your commercial quote for this customer RFQ.
            </p>
          </div>

          <button
            className="submit-quote-button"
            type="button"
            onClick={() => navigate(`/rfqs/${rfq.id}/quote`)}
          >
            <Send size={17} />
            Submit Quote
          </button>
        </div>
      )}

      {/* BUSINESS NOTE */}
      <div className="details-business-note">
        <UserRound size={18} />

        <p>
          RFQ eligibility, customer identity, product eligibility, validation,
          quote acceptance, and order creation will ultimately be enforced by
          the ARIANIQS backend.
        </p>
      </div>
    </div>
  );
}

export default RFQDetails;