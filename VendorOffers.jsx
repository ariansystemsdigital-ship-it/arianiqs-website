import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  Plus,
  MoreHorizontal,
  Package,
  CheckCircle2,
  Clock3,
  PauseCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";

import "./VendorOffers.css";

const defaultOffers = [
  {
    offerCode: "ARQ-O-000884",
    productCode: "ARQ-P-000125",
    productName: "SIMATIC S7-1200 CPU 1214C",
    mpn: "6ES7214-1AG40-0XB0",
    vendorSku: "AS-S7-1214C",
    price: "₹48,500",
    stock: 12,
    stockStatus: "In Stock",
    moq: 1,
    leadTime: "3 Days",
    warranty: "Manufacturer",
    status: "ACTIVE",
    visibility: "VISIBLE",
    updated: "06 Oct 2026",
  },
  {
    offerCode: "ARQ-O-000885",
    productCode: "ARQ-P-000126",
    productName: "Modicon M221 PLC",
    mpn: "TM221CE24R",
    vendorSku: "AS-M221-24R",
    price: "₹22,800",
    stock: 8,
    stockStatus: "In Stock",
    moq: 1,
    leadTime: "5 Days",
    warranty: "12 Months",
    status: "ACTIVE",
    visibility: "VISIBLE",
    updated: "05 Oct 2026",
  },
  {
    offerCode: "ARQ-O-000886",
    productCode: "ARQ-P-000127",
    productName: "ABB ACS355 Drive",
    mpn: "ACS355-03E-07A3-4",
    vendorSku: "AS-ACS355-07",
    price: "₹31,200",
    stock: 0,
    stockStatus: "Out of Stock",
    moq: 1,
    leadTime: "7 Days",
    warranty: "12 Months",
    status: "OUT_OF_STOCK",
    visibility: "HIDDEN",
    updated: "04 Oct 2026",
  },
  {
    offerCode: "ARQ-O-000887",
    productCode: "ARQ-P-000128",
    productName: "Omron CJ2M CPU",
    mpn: "CJ2M-CPU33",
    vendorSku: "AS-CJ2M-33",
    price: "₹36,750",
    stock: 4,
    stockStatus: "Low Stock",
    moq: 1,
    leadTime: "4 Days",
    warranty: "Manufacturer",
    status: "PAUSED",
    visibility: "HIDDEN",
    updated: "03 Oct 2026",
  },
  {
    offerCode: "ARQ-O-000888",
    productCode: "ARQ-P-000129",
    productName: "Industrial Ethernet Switch",
    mpn: "SCALANCE XC208",
    vendorSku: "AS-XC208",
    price: "₹18,900",
    stock: 15,
    stockStatus: "In Stock",
    moq: 2,
    leadTime: "6 Days",
    warranty: "12 Months",
    status: "DRAFT",
    visibility: "HIDDEN",
    updated: "02 Oct 2026",
  },
];

const statusOptions = [
  "ALL",
  "ACTIVE",
  "DRAFT",
  "PAUSED",
  "OUT_OF_STOCK",
  "SUSPENDED",
  "HIDDEN_SUBSCRIPTION",
];

function VendorOffers() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  /*
   * Combine the existing frontend offers with offers
   * saved from Add Vendor Offer.
   */
  const savedOffers = useMemo(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("arianiqs_vendor_offers") || "[]"
      );

      if (!Array.isArray(stored)) {
        return [];
      }

      return stored.map((offer) => ({
        offerCode: offer.id,
        productCode: offer.productId,
        productName: offer.product || "",
        mpn: offer.mpn || "",
        vendorSku: offer.vendorSku || "—",
        price: `${offer.currency === "INR" ? "₹" : offer.currency === "USD" ? "$" : "€"}${Number(
          offer.offerPrice || 0
        ).toLocaleString("en-IN")}`,
        stock: Number(offer.stock || 0),
        stockStatus:
          Number(offer.stock || 0) === 0
            ? "Out of Stock"
            : Number(offer.stock || 0) <= 5
              ? "Low Stock"
              : "In Stock",
        moq: Number(offer.moq || 0),
        leadTime: offer.leadTime || "—",
        warranty: offer.warranty || "—",
        status: offer.status || "DRAFT",
        visibility: offer.visibility || "HIDDEN",
        updated: offer.updated || "—",
        offerTitle: offer.offerTitle || "",
        currency: offer.currency || "INR",
        condition: offer.condition || "New",
        offerValidFrom: offer.offerValidFrom || "",
        offerValidUntil: offer.offerValidUntil || "",
        notes: offer.notes || "",
        brand: offer.brand || "",
      }));
    } catch {
      return [];
    }
  }, []);

  const offers = useMemo(() => {
    return [...defaultOffers, ...savedOffers];
  }, [savedOffers]);

  const filteredOffers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return offers.filter((offer) => {
      const matchesSearch =
        !search ||
        offer.offerCode.toLowerCase().includes(search) ||
        offer.productCode.toLowerCase().includes(search) ||
        offer.productName.toLowerCase().includes(search) ||
        offer.mpn.toLowerCase().includes(search) ||
        offer.vendorSku.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        offer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [offers, searchTerm, statusFilter]);

  const activeCount = offers.filter(
    (offer) => offer.status === "ACTIVE"
  ).length;

  const draftCount = offers.filter(
    (offer) => offer.status === "DRAFT"
  ).length;

  const pausedCount = offers.filter(
    (offer) => offer.status === "PAUSED"
  ).length;

  const outOfStockCount = offers.filter(
    (offer) => offer.status === "OUT_OF_STOCK"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "offer-status active";

      case "DRAFT":
        return "offer-status draft";

      case "PAUSED":
        return "offer-status paused";

      case "OUT_OF_STOCK":
        return "offer-status out-of-stock";

      case "SUSPENDED":
        return "offer-status suspended";

      case "HIDDEN_SUBSCRIPTION":
        return "offer-status hidden";

      default:
        return "offer-status";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle2 size={14} />;

      case "DRAFT":
        return <Clock3 size={14} />;

      case "PAUSED":
        return <PauseCircle size={14} />;

      case "OUT_OF_STOCK":
        return <AlertTriangle size={14} />;

      default:
        return <AlertTriangle size={14} />;
    }
  };

  const formatStatus = (status) => {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const openOffer = (offer) => {
    navigate(`/vendor-offers/${offer.offerCode}`);
  };

  return (
    <section className="vendor-offers-page">

      {/* PAGE HEADER */}
      <div className="offers-header">
        <div className="offers-header-left">
          <div className="offers-title-row">
            <div className="offers-title-icon">
              <Package size={22} />
            </div>

            <div>
              <h1>Vendor Offers</h1>

              <p>
                Manage your commercial offers linked to
                approved master products.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="offers-primary-button"
          onClick={() => navigate("/vendor-offers/add")}
        >
          <Plus size={17} />
          Add Offer
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="offers-summary-grid">

        <div className="offer-summary-card">
          <div className="summary-card-top">
            <span>Active Offers</span>
            <CheckCircle2 size={18} />
          </div>

          <strong>{activeCount}</strong>

          <small>Currently active</small>
        </div>

        <div className="offer-summary-card">
          <div className="summary-card-top">
            <span>Draft Offers</span>
            <Clock3 size={18} />
          </div>

          <strong>{draftCount}</strong>

          <small>Not yet activated</small>
        </div>

        <div className="offer-summary-card">
          <div className="summary-card-top">
            <span>Paused</span>
            <PauseCircle size={18} />
          </div>

          <strong>{pausedCount}</strong>

          <small>Temporarily unavailable</small>
        </div>

        <div className="offer-summary-card">
          <div className="summary-card-top">
            <span>Out of Stock</span>
            <AlertTriangle size={18} />
          </div>

          <strong>{outOfStockCount}</strong>

          <small>Stock unavailable</small>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="offers-toolbar">

        <div className="offers-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search offer code, product, MPN or SKU..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="offers-toolbar-actions">

          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status === "ALL"
                    ? "All Statuses"
                    : formatStatus(status)}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="status-filter-icon"
            />
          </div>

          <button
            type="button"
            className={`filter-button ${
              showFilters ? "filter-active" : ""
            }`}
            onClick={() =>
              setShowFilters((current) => !current)
            }
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="offers-filter-panel">

          <div className="filter-panel-item">
            <span>Stock</span>

            <select defaultValue="ALL">
              <option value="ALL">All Stock</option>
              <option value="IN_STOCK">In Stock</option>
              <option value="LOW_STOCK">Low Stock</option>
              <option value="OUT_OF_STOCK">
                Out of Stock
              </option>
            </select>
          </div>

          <div className="filter-panel-item">
            <span>Visibility</span>

            <select defaultValue="ALL">
              <option value="ALL">All Visibility</option>
              <option value="VISIBLE">Visible</option>
              <option value="HIDDEN">Hidden</option>
            </select>
          </div>

          <div className="filter-panel-note">
            <AlertTriangle size={15} />

            <span>
              Marketplace visibility is controlled by
              backend eligibility rules.
            </span>
          </div>

        </div>
      )}

      {/* OFFERS TABLE */}
      <div className="offers-table-card">

        <div className="offers-table-header">
          <div>
            <h2>All Vendor Offers</h2>

            <span>
              {filteredOffers.length} of {offers.length} offers
            </span>
          </div>

          <div className="table-header-info">
            <span>Commercial information</span>
          </div>
        </div>

        <div className="offers-table-wrapper">

          <table className="offers-table">

            <thead>
              <tr>
                <th>Offer</th>
                <th>Product</th>
                <th>Vendor SKU</th>
                <th>Price</th>
                <th>Stock</th>
                <th>MOQ</th>
                <th>Lead Time</th>
                <th>Warranty</th>
                <th>Status</th>
                <th>Visibility</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredOffers.length > 0 ? (

                filteredOffers.map((offer) => (

                  <tr
                    key={offer.offerCode}
                    className="offer-row-clickable"
                    onClick={() => openOffer(offer)}
                  >

                    {/* OFFER */}
                    <td>
                      <div className="offer-code-cell">
                        <strong>
                          {offer.offerCode}
                        </strong>

                        <span>
                          {offer.productCode}
                        </span>
                      </div>
                    </td>

                    {/* PRODUCT */}
                    <td>
                      <div className="product-cell">
                        <strong>
                          {offer.productName}
                        </strong>

                        <span>
                          MPN: {offer.mpn}
                        </span>
                      </div>
                    </td>

                    {/* SKU */}
                    <td>
                      <span className="sku-value">
                        {offer.vendorSku}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td>
                      <strong className="price-value">
                        {offer.price}
                      </strong>
                    </td>

                    {/* STOCK */}
                    <td>
                      <div className="stock-cell">
                        <strong>
                          {offer.stock}
                        </strong>

                        <span
                          className={
                            offer.stock === 0
                              ? "stock-out"
                              : offer.stock <= 5
                                ? "stock-low"
                                : "stock-good"
                          }
                        >
                          {offer.stockStatus}
                        </span>
                      </div>
                    </td>

                    {/* MOQ */}
                    <td>{offer.moq}</td>

                    {/* LEAD TIME */}
                    <td>{offer.leadTime}</td>

                    {/* WARRANTY */}
                    <td>{offer.warranty}</td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={getStatusClass(
                          offer.status
                        )}
                      >
                        {getStatusIcon(offer.status)}

                        {formatStatus(
                          offer.status
                        )}
                      </span>
                    </td>

                    {/* VISIBILITY */}
                    <td>
                      <span
                        className={`offer-visibility ${
                          offer.visibility === "VISIBLE"
                            ? "visible"
                            : "hidden"
                        }`}
                      >
                        {offer.visibility === "VISIBLE" ? (
                          <Eye size={14} />
                        ) : (
                          <EyeOff size={14} />
                        )}

                        {offer.visibility === "VISIBLE"
                          ? "Visible"
                          : "Hidden"}
                      </span>
                    </td>

                    {/* UPDATED */}
                    <td>
                      <span className="updated-date">
                        {offer.updated}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <button
                        type="button"
                        className="offer-action-button"
                        aria-label={`View ${offer.offerCode}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          openOffer(offer);
                        }}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>

                  </tr>
                ))

              ) : (

                <tr>
                  <td
                    colSpan="12"
                    className="offers-empty-state"
                  >
                    <Package size={30} />

                    <strong>
                      No offers found
                    </strong>

                    <span>
                      Try changing your search or status
                      filter.
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* TABLE FOOTER */}
        <div className="offers-table-footer">
          <span>
            Showing {filteredOffers.length} offers
          </span>

          <span>
            Vendor commercial data
          </span>
        </div>

      </div>

    </section>
  );
}

export default VendorOffers;