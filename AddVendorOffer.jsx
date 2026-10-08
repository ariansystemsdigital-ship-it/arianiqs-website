import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Save,
  Send,
} from "lucide-react";
import "./AddVendorOffer.css";

const masterProducts = [
  {
    id: "ARQ-P-000125",
    name: "SIMATIC S7-1200 CPU 1214C",
    mpn: "6ES7214-1AG40-0XB0",
    brand: "Siemens",
  },
  {
    id: "ARQ-P-000126",
    name: "Modicon M221 PLC",
    mpn: "TM221CE24R",
    brand: "Schneider Electric",
  },
  {
    id: "ARQ-P-000127",
    name: "ABB ACS355 Drive",
    mpn: "ACS355-03E-08A8-4",
    brand: "ABB",
  },
  {
    id: "ARQ-P-000128",
    name: "Omron CJ2M CPU",
    mpn: "CJ2M-CPU33",
    brand: "Omron",
  },
];

function AddVendorOffer() {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [vendorSku, setVendorSku] = useState("");
  const [offerTitle, setOfferTitle] = useState("");

  // Commercial Details
  const [offerPrice, setOfferPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [moq, setMoq] = useState("");

  // Operational Details
  const [stock, setStock] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [warranty, setWarranty] = useState("");

  const [condition, setCondition] = useState("New");

  const [offerValidFrom, setOfferValidFrom] = useState("");
  const [offerValidUntil, setOfferValidUntil] = useState("");

  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [actionType, setActionType] = useState("");

  const selectedProduct = masterProducts.find(
    (product) => product.id === productId
  );

  const validateForm = () => {
    const newErrors = {};

    if (!productId) {
      newErrors.productId = "Select a master product.";
    }

    if (!offerPrice || Number(offerPrice) <= 0) {
      newErrors.offerPrice = "Enter a valid offer price.";
    }

    if (!moq || Number(moq) <= 0) {
      newErrors.moq = "Enter a valid minimum order quantity.";
    }

    if (stock === "" || Number(stock) < 0) {
      newErrors.stock = "Enter a valid stock quantity.";
    }

    if (!leadTime || Number(leadTime) <= 0) {
      newErrors.leadTime = "Enter lead time.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (type) => {
    setActionType(type);

    if (!validateForm()) {
      return;
    }

    const existingOffers = JSON.parse(
      localStorage.getItem("arianiqs_vendor_offers") || "[]"
    );

    const offerCode = `ARQ-O-${String(
      existingOffers.length + 889
    ).padStart(6, "0")}`;

    const newOffer = {
      id: offerCode,
      productId,
      product: selectedProduct?.name || "",
      mpn: selectedProduct?.mpn || "",
      brand: selectedProduct?.brand || "",

      vendorSku,
      offerTitle,

      offerPrice: Number(offerPrice),
      currency,
      moq: Number(moq),

      stock: Number(stock),
      leadTime: `${leadTime} Days`,
      warranty,

      condition,

      offerValidFrom,
      offerValidUntil,

      notes,

      status: type === "activate" ? "ACTIVE" : "DRAFT",
      visibility: type === "activate" ? "VISIBLE" : "HIDDEN",

      updated: new Date().toLocaleDateString("en-GB"),
    };

    localStorage.setItem(
      "arianiqs_vendor_offers",
      JSON.stringify([...existingOffers, newOffer])
    );

    setSaved(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (saved) {
    return (
      <div className="add-offer-page">
        <div className="offer-success-card">
          <div className="offer-success-icon">
            <CheckCircle2 size={42} />
          </div>

          <h1>
            {actionType === "activate"
              ? "Vendor Offer Submitted"
              : "Vendor Offer Saved"}
          </h1>

          <p>
            Your vendor offer has been prepared successfully.
          </p>

          <div className="offer-success-details">
            <div>
              <span>Product</span>
              <strong>{selectedProduct?.name}</strong>
            </div>

            <div>
              <span>MPN</span>
              <strong>{selectedProduct?.mpn}</strong>
            </div>

            <div>
              <span>Offer Price</span>
              <strong>
                {currency === "INR" && "₹ "}
                {currency === "USD" && "$ "}
                {currency === "EUR" && "€ "}
                {Number(offerPrice).toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>MOQ</span>
              <strong>{moq}</strong>
            </div>

            <div>
              <span>Stock</span>
              <strong>{stock}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>
                {actionType === "activate" ? "ACTIVE" : "DRAFT"}
              </strong>
            </div>
          </div>

          <div className="offer-success-note">
            <Package size={17} />

            <p>
              This frontend currently demonstrates the vendor offer workflow.
              Final marketplace eligibility and visibility must be enforced by
              the ARIANIQS backend.
            </p>
          </div>

          <div className="offer-success-actions">
            <button
              type="button"
              className="secondary-offer-button"
              onClick={() => navigate("/vendor-offers")}
            >
              Back to Vendor Offers
            </button>

            <button
              type="button"
              className="primary-offer-button"
              onClick={() => navigate("/vendor-offers")}
            >
              View Offers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-offer-page">
      {/* TOP */}
      <div className="offer-topbar">
        <button
          type="button"
          className="offer-back-button"
          onClick={() => navigate("/vendor-offers")}
        >
          <ArrowLeft size={17} />
          Back to Vendor Offers
        </button>

        <span className="offer-page-step">
          VENDOR OFFER
        </span>
      </div>

      {/* HEADER */}
      <div className="offer-page-header">
        <div className="offer-breadcrumb">
          Vendor Portal / Vendor Offers / Add Offer
        </div>

        <h1>Add Vendor Offer</h1>

        <p>
          Add your commercial offer against an existing ARIANIQS master
          product.
        </p>
      </div>

      <form
        className="add-offer-form"
        onSubmit={(event) => event.preventDefault()}
      >
        {/* =====================================================
            PRODUCT
        ===================================================== */}

        <section className="offer-form-card">
          <div className="offer-section-heading">
            <div className="offer-section-icon">
              <Package size={18} />
            </div>

            <div>
              <h2>Product</h2>
              <p>Select the ARIANIQS master product for your offer.</p>
            </div>
          </div>

          <div className="offer-field">
            <label>
              Master Product <span>*</span>
            </label>

            <select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              <option value="">Select master product</option>

              {masterProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — {product.mpn}
                </option>
              ))}
            </select>

            {errors.productId && (
              <small className="offer-field-error">
                {errors.productId}
              </small>
            )}
          </div>

          {selectedProduct && (
            <div className="selected-product-card">
              <div>
                <span>Master Product Code</span>
                <strong>{selectedProduct.id}</strong>
              </div>

              <div>
                <span>Brand</span>
                <strong>{selectedProduct.brand}</strong>
              </div>

              <div>
                <span>MPN</span>
                <strong>{selectedProduct.mpn}</strong>
              </div>
            </div>
          )}
        </section>

        {/* =====================================================
            VENDOR IDENTIFICATION
        ===================================================== */}

        <section className="offer-form-card">
          <div className="offer-section-heading">
            <div className="offer-section-icon">
              <Package size={18} />
            </div>

            <div>
              <h2>Vendor Offer Information</h2>
              <p>
                Add your vendor-specific identification for this offer.
              </p>
            </div>
          </div>

          <div className="offer-form-grid">
            <div className="offer-field">
              <label>Vendor SKU</label>

              <input
                type="text"
                maxLength="120"
                placeholder="Enter your vendor SKU"
                value={vendorSku}
                onChange={(event) =>
                  setVendorSku(event.target.value)
                }
              />
            </div>

            <div className="offer-field">
              <label>Offer Title</label>

              <input
                type="text"
                maxLength="200"
                placeholder="Enter offer title"
                value={offerTitle}
                onChange={(event) =>
                  setOfferTitle(event.target.value)
                }
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            COMMERCIAL DETAILS
        ===================================================== */}

        <section className="offer-form-card">
          <div className="offer-section-heading">
            <div className="offer-section-icon">
              <Package size={18} />
            </div>

            <div>
              <h2>Commercial Details</h2>
              <p>
                Set pricing and minimum purchase requirements.
              </p>
            </div>
          </div>

          <div className="offer-form-grid">
            {/* OFFER PRICE */}
            <div className="offer-field">
              <label>
                Offer Price <span>*</span>
              </label>

              <div className="offer-price-wrapper">
                <div className="offer-currency-symbol">
                  {currency === "INR" && "₹"}
                  {currency === "USD" && "$"}
                  {currency === "EUR" && "€"}
                </div>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter offer price"
                  value={offerPrice}
                  onChange={(event) =>
                    setOfferPrice(event.target.value)
                  }
                />
              </div>

              {errors.offerPrice && (
                <small className="offer-field-error">
                  {errors.offerPrice}
                </small>
              )}
            </div>

            {/* CURRENCY */}
            <div className="offer-field">
              <label>Currency</label>

              <select
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value)
                }
              >
                <option value="INR">
                  INR — Indian Rupee
                </option>

                <option value="USD">
                  USD — US Dollar
                </option>

                <option value="EUR">
                  EUR — Euro
                </option>
              </select>
            </div>

            {/* MOQ */}
            <div className="offer-field">
              <label>
                Minimum Order Quantity <span>*</span>
              </label>

              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter minimum quantity"
                value={moq}
                onChange={(event) =>
                  setMoq(event.target.value)
                }
              />

              {errors.moq && (
                <small className="offer-field-error">
                  {errors.moq}
                </small>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            OPERATIONAL DETAILS
        ===================================================== */}

        <section className="offer-form-card">
          <div className="offer-section-heading">
            <div className="offer-section-icon">
              <Package size={18} />
            </div>

            <div>
              <h2>Operational Details</h2>
              <p>
                Provide availability, delivery and warranty information.
              </p>
            </div>
          </div>

          <div className="offer-form-grid">
            <div className="offer-field">
              <label>
                Stock <span>*</span>
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter available stock"
                value={stock}
                onChange={(event) =>
                  setStock(event.target.value)
                }
              />

              {errors.stock && (
                <small className="offer-field-error">
                  {errors.stock}
                </small>
              )}
            </div>

            <div className="offer-field">
              <label>
                Lead Time (Days) <span>*</span>
              </label>

              <input
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 5"
                value={leadTime}
                onChange={(event) =>
                  setLeadTime(event.target.value)
                }
              />

              {errors.leadTime && (
                <small className="offer-field-error">
                  {errors.leadTime}
                </small>
              )}
            </div>

            <div className="offer-field">
              <label>Warranty</label>

              <select
                value={warranty}
                onChange={(event) =>
                  setWarranty(event.target.value)
                }
              >
                <option value="">Select warranty</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="12 Months">12 Months</option>
                <option value="24 Months">24 Months</option>
                <option value="No Warranty">No Warranty</option>
              </select>
            </div>

            <div className="offer-field">
              <label>Condition</label>

              <select
                value={condition}
                onChange={(event) =>
                  setCondition(event.target.value)
                }
              >
                <option value="New">New</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>
          </div>
        </section>

        {/* =====================================================
            VALIDITY
        ===================================================== */}

        <section className="offer-form-card">
          <div className="offer-section-heading">
            <div className="offer-section-icon">
              <Package size={18} />
            </div>

            <div>
              <h2>Offer Validity</h2>
              <p>
                Specify the period for which the commercial offer applies.
              </p>
            </div>
          </div>

          <div className="offer-form-grid">
            <div className="offer-field">
              <label>Valid From</label>

              <input
                type="date"
                value={offerValidFrom}
                onChange={(event) =>
                  setOfferValidFrom(event.target.value)
                }
              />
            </div>

            <div className="offer-field">
              <label>Valid Until</label>

              <input
                type="date"
                value={offerValidUntil}
                onChange={(event) =>
                  setOfferValidUntil(event.target.value)
                }
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            NOTES
        ===================================================== */}

        <section className="offer-form-card">
          <div className="offer-section-heading">
            <div className="offer-section-icon">
              <Package size={18} />
            </div>

            <div>
              <h2>Notes</h2>
              <p>
                Add additional information relevant to this offer.
              </p>
            </div>
          </div>

          <div className="offer-field full-field">
            <label>Notes</label>

            <textarea
              rows="5"
              maxLength="1000"
              placeholder="Enter additional offer information..."
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
            />

            <div className="offer-field-counter">
              {notes.length}/1000
            </div>
          </div>
        </section>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="offer-form-actions">
          <button
            type="button"
            className="secondary-offer-button"
            onClick={() => navigate("/vendor-offers")}
          >
            Cancel
          </button>

          <button
            type="button"
            className="secondary-offer-button"
            onClick={() => handleSave("draft")}
          >
            <Save size={16} />
            Save Draft
          </button>

          <button
            type="button"
            className="primary-offer-button"
            onClick={() => handleSave("activate")}
          >
            <Send size={16} />
            Activate Offer
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVendorOffer;