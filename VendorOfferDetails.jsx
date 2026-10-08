import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Clock3,
  PauseCircle,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";

import "./VendorOfferDetails.css";

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

function VendorOfferDetails() {
  const navigate = useNavigate();
  const { offerCode } = useParams();

  const offer = useMemo(() => {
    const stored = JSON.parse(
      localStorage.getItem("arianiqs_vendor_offers") || "[]"
    );

    const savedOffer = stored.find(
      (item) => item.id === offerCode
    );

    if (savedOffer) {
      return {
        offerCode: savedOffer.id,
        productCode: savedOffer.productId,
        productName: savedOffer.product || "",
        mpn: savedOffer.mpn || "",
        vendorSku: savedOffer.vendorSku || "—",
        offerTitle: savedOffer.offerTitle || "—",
        price: `${savedOffer.currency === "INR" ? "₹" : savedOffer.currency === "USD" ? "$" : "€"}${Number(
          savedOffer.offerPrice || 0
        ).toLocaleString("en-IN")}`,
        currency: savedOffer.currency || "INR",
        stock: savedOffer.stock || 0,
        moq: savedOffer.moq || 0,
        leadTime: savedOffer.leadTime || "—",
        warranty: savedOffer.warranty || "—",
        condition: savedOffer.condition || "—",
        status: savedOffer.status || "DRAFT",
        visibility: savedOffer.visibility || "HIDDEN",
        offerValidFrom: savedOffer.offerValidFrom || "—",
        offerValidUntil: savedOffer.offerValidUntil || "—",
        notes: savedOffer.notes || "—",
        updated: savedOffer.updated || "—",
      };
    }

    return defaultOffers.find(
      (item) => item.offerCode === offerCode
    );
  }, [offerCode]);

  if (!offer) {
    return (
      <section className="vendor-offer-details-page">
        <div className="offer-details-not-found">
          <Package size={40} />

          <h1>Vendor Offer Not Found</h1>

          <p>
            The requested vendor offer could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/vendor-offers")}
          >
            <ArrowLeft size={16} />
            Back to Vendor Offers
          </button>
        </div>
      </section>
    );
  }

  const statusClass =
    offer.status === "ACTIVE"
      ? "active"
      : offer.status === "DRAFT"
        ? "draft"
        : offer.status === "PAUSED"
          ? "paused"
          : offer.status === "OUT_OF_STOCK"
            ? "out-of-stock"
            : "other";

  const statusIcon =
    offer.status === "ACTIVE" ? (
      <CheckCircle2 size={15} />
    ) : offer.status === "DRAFT" ? (
      <Clock3 size={15} />
    ) : offer.status === "PAUSED" ? (
      <PauseCircle size={15} />
    ) : (
      <AlertTriangle size={15} />
    );

  const formatStatus = (status) => {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <section className="vendor-offer-details-page">

      {/* TOP BAR */}
      <div className="offer-details-topbar">
        <button
          type="button"
          className="offer-details-back"
          onClick={() => navigate("/vendor-offers")}
        >
          <ArrowLeft size={17} />
          Back to Vendor Offers
        </button>

        <span>VENDOR OFFER</span>
      </div>

      {/* HEADER */}
      <div className="offer-details-header">

        <div>
          <div className="offer-details-breadcrumb">
            Vendor Portal / Vendor Offers / {offer.offerCode}
          </div>

          <h1>{offer.productName}</h1>

          <p>
            Vendor offer {offer.offerCode} linked to master product{" "}
            {offer.productCode}.
          </p>
        </div>

        <div className={`offer-details-status ${statusClass}`}>
          {statusIcon}
          {formatStatus(offer.status)}
        </div>

      </div>

      {/* PRODUCT */}
      <section className="offer-details-card">

        <div className="offer-details-card-heading">
          <div className="offer-details-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Product Information</h2>
            <p>Master product linked to this vendor offer.</p>
          </div>
        </div>

        <div className="offer-details-grid">

          <div>
            <span>Master Product Code</span>
            <strong>{offer.productCode}</strong>
          </div>

          <div>
            <span>Product Name</span>
            <strong>{offer.productName}</strong>
          </div>

          <div>
            <span>MPN</span>
            <strong>{offer.mpn}</strong>
          </div>

          <div>
            <span>Vendor SKU</span>
            <strong>{offer.vendorSku}</strong>
          </div>

        </div>

      </section>

      {/* COMMERCIAL */}
      <section className="offer-details-card">

        <div className="offer-details-card-heading">
          <div className="offer-details-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Commercial Information</h2>
            <p>Commercial values associated with this offer.</p>
          </div>
        </div>

        <div className="offer-details-grid">

          <div>
            <span>Offer Title</span>
            <strong>{offer.offerTitle || "—"}</strong>
          </div>

          <div>
            <span>Offer Price</span>
            <strong>{offer.price}</strong>
          </div>

          <div>
            <span>Minimum Order Quantity</span>
            <strong>{offer.moq}</strong>
          </div>

          <div>
            <span>Condition</span>
            <strong>{offer.condition || "—"}</strong>
          </div>

        </div>

      </section>

      {/* OPERATIONS */}
      <section className="offer-details-card">

        <div className="offer-details-card-heading">
          <div className="offer-details-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Operational Information</h2>
            <p>Availability and delivery information.</p>
          </div>
        </div>

        <div className="offer-details-grid">

          <div>
            <span>Stock</span>
            <strong>{offer.stock}</strong>
          </div>

          <div>
            <span>Lead Time</span>
            <strong>{offer.leadTime}</strong>
          </div>

          <div>
            <span>Warranty</span>
            <strong>{offer.warranty}</strong>
          </div>

          <div>
            <span>Visibility</span>

            <strong className="details-visibility">
              {offer.visibility === "VISIBLE" ? (
                <Eye size={15} />
              ) : (
                <EyeOff size={15} />
              )}

              {offer.visibility === "VISIBLE"
                ? "Visible"
                : "Hidden"}
            </strong>
          </div>

        </div>

      </section>

      {/* VALIDITY */}
      <section className="offer-details-card">

        <div className="offer-details-card-heading">
          <div className="offer-details-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Offer Validity</h2>
            <p>Validity period provided for this offer.</p>
          </div>
        </div>

        <div className="offer-details-grid">

          <div>
            <span>Valid From</span>
            <strong>{offer.offerValidFrom || "—"}</strong>
          </div>

          <div>
            <span>Valid Until</span>
            <strong>{offer.offerValidUntil || "—"}</strong>
          </div>

          <div>
            <span>Last Updated</span>
            <strong>{offer.updated}</strong>
          </div>

        </div>

      </section>

      {/* NOTES */}
      <section className="offer-details-card">

        <div className="offer-details-card-heading">
          <div className="offer-details-card-icon">
            <Package size={18} />
          </div>

          <div>
            <h2>Notes</h2>
            <p>Additional information associated with this offer.</p>
          </div>
        </div>

        <div className="offer-details-notes">
          {offer.notes || "No additional notes provided."}
        </div>

      </section>

      {/* FOOTER */}
      <div className="offer-details-footer">

        <button
          type="button"
          className="secondary-offer-button"
          onClick={() => navigate("/vendor-offers")}
        >
          <ArrowLeft size={16} />
          Back to Vendor Offers
        </button>

      </div>

    </section>
  );
}

export default VendorOfferDetails;