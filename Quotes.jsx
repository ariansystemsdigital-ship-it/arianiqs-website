import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  ChevronRight,
  X,
} from "lucide-react";
import "./Quotes.css";

const quoteData = [
  {
    id: "QUO-000184",
    rfqId: "RFQ-000239",
    product: "ABB ACS355 Drive",
    mpn: "ACS355-03E-08A8-4",
    quantity: 3,
    unitPrice: 31200,
    deliveryDays: 7,
    validityDays: 30,
    submitted: "06 Oct 2026",
    status: "SUBMITTED",
  },
  {
    id: "QUO-000183",
    rfqId: "RFQ-000236",
    product: "SIMATIC S7-1200 CPU 1214C",
    mpn: "6ES7214-1AG40-0XB0",
    quantity: 2,
    unitPrice: 48500,
    deliveryDays: 5,
    validityDays: 30,
    submitted: "05 Oct 2026",
    status: "UNDER_REVIEW",
  },
  {
    id: "QUO-000182",
    rfqId: "RFQ-000231",
    product: "Modicon M221 PLC",
    mpn: "TM221CE24R",
    quantity: 10,
    unitPrice: 22800,
    deliveryDays: 14,
    validityDays: 15,
    submitted: "03 Oct 2026",
    status: "ACCEPTED",
  },
  {
    id: "QUO-000181",
    rfqId: "RFQ-000229",
    product: "Omron CJ2M CPU",
    mpn: "CJ2M-CPU33",
    quantity: 2,
    unitPrice: 36750,
    deliveryDays: 4,
    validityDays: 30,
    submitted: "02 Oct 2026",
    status: "REJECTED",
  },
];

function Quotes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredQuotes = useMemo(() => {
    return quoteData.filter((quote) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        quote.id.toLowerCase().includes(searchText) ||
        quote.rfqId.toLowerCase().includes(searchText) ||
        quote.product.toLowerCase().includes(searchText) ||
        quote.mpn.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" || quote.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const formatPrice = (value) => {
    return `₹ ${value.toLocaleString("en-IN")}`;
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replaceAll("_", "-");
  };

  return (
    <div className="quotes-page">
      {/* HEADER */}
      <div className="quotes-header">
        <div>
          <div className="quotes-breadcrumb">
            Vendor Portal / Quotes
          </div>

          <h1>Quotes</h1>

          <p>
            Manage vendor quote responses submitted against customer RFQs.
          </p>
        </div>

        <div className="quotes-count">
          <FileText size={17} />
          <span>{filteredQuotes.length} Quotes</span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="quotes-summary-grid">
        <div className="quote-summary-card">
          <div className="quote-summary-icon submitted">
            <FileText size={20} />
          </div>

          <div>
            <span>Submitted</span>
            <strong>
              {
                quoteData.filter(
                  (quote) => quote.status === "SUBMITTED"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="quote-summary-card">
          <div className="quote-summary-icon review">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>
              {
                quoteData.filter(
                  (quote) => quote.status === "UNDER_REVIEW"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="quote-summary-card">
          <div className="quote-summary-icon accepted">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Accepted</span>
            <strong>
              {
                quoteData.filter(
                  (quote) => quote.status === "ACCEPTED"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="quote-summary-card">
          <div className="quote-summary-icon rejected">
            <XCircle size={20} />
          </div>

          <div>
            <span>Rejected</span>
            <strong>
              {
                quoteData.filter(
                  (quote) => quote.status === "REJECTED"
                ).length
              }
            </strong>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="quotes-toolbar">
        <div className="quotes-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search quote ID, RFQ, product or MPN..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="quotes-clear-search"
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="quotes-filter-button"
          onClick={() => setShowFilters((value) => !value)}
        >
          <Filter size={17} />
          Filters
        </button>
      </div>

      {/* FILTER */}
      {showFilters && (
        <div className="quotes-filter-panel">
          <div className="quotes-filter-field">
            <label>Quote Status</label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <button
            type="button"
            className="quotes-reset-button"
            onClick={() => {
              setSearch("");
              setStatusFilter("ALL");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="quotes-table-card">
        <div className="quotes-table-heading">
          <div>
            <h2>Vendor Quotes</h2>
            <p>
              Quotes submitted against customer RFQs.
            </p>
          </div>
        </div>

        <div className="quotes-table-wrapper">
          <table className="quotes-table">
            <thead>
              <tr>
                <th>Quote</th>
                <th>RFQ</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Delivery</th>
                <th>Validity</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td>
                      <div className="quote-id">
                        {quote.id}
                      </div>

                      <span className="quote-date">
                        {quote.submitted}
                      </span>
                    </td>

                    <td>
                      <span className="rfq-reference">
                        {quote.rfqId}
                      </span>
                    </td>

                    <td>
                      <div className="quote-product">
                        {quote.product}
                      </div>

                      <span className="quote-mpn">
                        {quote.mpn}
                      </span>
                    </td>

                    <td>
                      <strong>{quote.quantity}</strong>
                    </td>

                    <td>
                      <strong>
                        {formatPrice(quote.unitPrice)}
                      </strong>
                    </td>

                    <td>
                      <div className="quote-delivery">
                        <Clock3 size={14} />
                        {quote.deliveryDays} Days
                      </div>
                    </td>

                    <td>
                      {quote.validityDays} Days
                    </td>

                    <td>
                      <span
                        className={`quote-status ${getStatusClass(
                          quote.status
                        )}`}
                      >
                        {quote.status.replaceAll("_", " ")}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="quote-view-button"
                        onClick={() =>
                          navigate(`/rfqs/${quote.rfqId}`)
                        }
                      >
                        View
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="quotes-empty">
                      <FileText size={32} />
                      <h3>No quotes found</h3>
                      <p>
                        No quote matches the current search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* WORKFLOW NOTE */}
      <div className="quotes-workflow-note">
        <div className="quotes-note-icon">
          <FileText size={18} />
        </div>

        <div>
          <strong>Quote workflow</strong>

          <p>
            A vendor submits a quote against an eligible RFQ. The customer
            reviews submitted quotes and may accept or reject a quote.
            An accepted quote can proceed to order creation through the
            connected ARIANIQS workflow.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Quotes;