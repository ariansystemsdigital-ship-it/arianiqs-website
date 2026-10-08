import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronRight,
  Clock3,
  FileText,
  Package,
  CalendarDays,
  X,
} from "lucide-react";
import "./RFQs.css";

const rfqData = [
  {
    id: "RFQ-000241",
    product: "SIMATIC S7-1200 CPU 1214C",
    mpn: "6ES7214-1AG40-0XB0",
    customer: "Customer RFQ",
    quantity: 5,
    deliveryNeed: "10 Days",
    submitted: "07 Oct 2026",
    status: "OPEN",
    requirements: "PLC controller required for industrial automation application.",
  },
  {
    id: "RFQ-000240",
    product: "Modicon M221 PLC",
    mpn: "TM221CE24R",
    customer: "Customer RFQ",
    quantity: 10,
    deliveryNeed: "14 Days",
    submitted: "07 Oct 2026",
    status: "OPEN",
    requirements: "New condition PLC with standard warranty.",
  },
  {
    id: "RFQ-000239",
    product: "ABB ACS355 Drive",
    mpn: "ACS355-03E-08A8-4",
    customer: "Customer RFQ",
    quantity: 3,
    deliveryNeed: "7 Days",
    submitted: "06 Oct 2026",
    status: "QUOTED",
    requirements: "Variable frequency drive for motor control application.",
  },
  {
    id: "RFQ-000238",
    product: "Omron CJ2M CPU",
    mpn: "CJ2M-CPU33",
    customer: "Customer RFQ",
    quantity: 2,
    deliveryNeed: "12 Days",
    submitted: "06 Oct 2026",
    status: "UNDER_REVIEW",
    requirements: "CPU module required with suitable accessories.",
  },
  {
    id: "RFQ-000237",
    product: "SCALANCE XC208",
    mpn: "SCALANCE XC208",
    customer: "Customer RFQ",
    quantity: 4,
    deliveryNeed: "15 Days",
    submitted: "05 Oct 2026",
    status: "EXPIRED",
    requirements: "Industrial Ethernet switch.",
  },
];

function RFQs() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRFQs = useMemo(() => {
    return rfqData.filter((rfq) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        rfq.id.toLowerCase().includes(searchText) ||
        rfq.product.toLowerCase().includes(searchText) ||
        rfq.mpn.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" || rfq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const statusClass = (status) => {
    return status.toLowerCase().replaceAll("_", "-");
  };

  return (
    <div className="rfq-page">
      {/* PAGE HEADER */}
      <div className="rfq-header">
        <div>
          <div className="rfq-breadcrumb">Vendor Portal / RFQs</div>

          <h1>RFQ Inbox</h1>

          <p>
            Review customer requests for quotation that your vendor account is
            eligible to respond to.
          </p>
        </div>

        <div className="rfq-header-badge">
          <FileText size={17} />
          <span>{filteredRFQs.length} RFQs</span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="rfq-summary-grid">
        <div className="rfq-summary-card">
          <div className="summary-icon open">
            <FileText size={20} />
          </div>

          <div>
            <span>Open</span>
            <strong>
              {rfqData.filter((item) => item.status === "OPEN").length}
            </strong>
          </div>
        </div>

        <div className="rfq-summary-card">
          <div className="summary-icon quoted">
            <Package size={20} />
          </div>

          <div>
            <span>Quoted</span>
            <strong>
              {rfqData.filter((item) => item.status === "QUOTED").length}
            </strong>
          </div>
        </div>

        <div className="rfq-summary-card">
          <div className="summary-icon review">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>
              {
                rfqData.filter((item) => item.status === "UNDER_REVIEW")
                  .length
              }
            </strong>
          </div>
        </div>

        <div className="rfq-summary-card">
          <div className="summary-icon total">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Total RFQs</span>
            <strong>{rfqData.length}</strong>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="rfq-toolbar">
        <div className="rfq-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search RFQ ID, product or MPN..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              type="button"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          className="rfq-filter-button"
          type="button"
          onClick={() => setShowFilters((value) => !value)}
        >
          <Filter size={17} />
          Filters
        </button>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="rfq-filter-panel">
          <div className="filter-field">
            <label>RFQ Status</label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="QUOTED">Quoted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>

          <button
            type="button"
            className="reset-filter"
            onClick={() => {
              setStatusFilter("ALL");
              setSearch("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* RFQ TABLE */}
      <div className="rfq-table-card">
        <div className="rfq-table-heading">
          <div>
            <h2>Customer RFQs</h2>
            <p>RFQs currently available to your vendor account.</p>
          </div>
        </div>

        <div className="rfq-table-wrapper">
          <table className="rfq-table">
            <thead>
              <tr>
                <th>RFQ</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Delivery Need</th>
                <th>Submitted</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredRFQs.length > 0 ? (
                filteredRFQs.map((rfq) => (
                  <tr key={rfq.id}>
                    <td>
                      <div className="rfq-id">{rfq.id}</div>
                      <span className="rfq-customer">{rfq.customer}</span>
                    </td>

                    <td>
                      <div className="rfq-product-name">{rfq.product}</div>
                      <span className="rfq-mpn">{rfq.mpn}</span>
                    </td>

                    <td>
                      <strong>{rfq.quantity}</strong>
                    </td>

                    <td>
                      <div className="delivery-cell">
                        <Clock3 size={15} />
                        {rfq.deliveryNeed}
                      </div>
                    </td>

                    <td>{rfq.submitted}</td>

                    <td>
                      <span
                        className={`rfq-status ${statusClass(rfq.status)}`}
                      >
                        {rfq.status.replaceAll("_", " ")}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-rfq-button"
                        type="button"
                        onClick={() => navigate(`/rfqs/${rfq.id}`)}
                      >
                        View
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-rfq">
                      <FileText size={32} />
                      <h3>No RFQs found</h3>
                      <p>
                        No RFQ matches your current search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BUSINESS NOTE */}
      <div className="rfq-business-note">
        <div className="note-icon">
          <FileText size={18} />
        </div>

        <div>
          <strong>RFQ workflow</strong>

          <p>
            Eligible customer RFQs are received through the ARIANIQS backend.
            Vendors review the request and submit a quote. Quote acceptance
            and order creation are handled through the connected workflow.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RFQs;