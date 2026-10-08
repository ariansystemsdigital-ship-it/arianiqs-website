import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Search,
  Plus,
  Save,
  X,
} from "lucide-react";

function ProductIdentity() {
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [mpn, setMpn] = useState("");

  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const [categories, setCategories] = useState([
    "Industrial Automation",
    "Electrical",
    "Electronics",
    "Mechanical",
    "Pneumatics",
  ]);

  const [productTypes, setProductTypes] = useState({
    "Industrial Automation": [
      "PLC",
      "HMI",
      "Industrial Sensor",
      "VFD / Drive",
      "Industrial Communication",
    ],

    Electrical: [
      "MCCB",
      "MCB",
      "Contactor",
      "Relay",
      "Circuit Breaker",
    ],

    Electronics: [
      "Power Supply",
      "Controller",
      "Module",
      "Electronic Component",
    ],

    Mechanical: [
      "Bearing",
      "Coupling",
      "Gearbox",
      "Mechanical Component",
    ],

    Pneumatics: [
      "Cylinder",
      "Valve",
      "FRL",
      "Pneumatic Fitting",
    ],
  });

  const [brands, setBrands] = useState([
    "Siemens",
    "Schneider Electric",
    "ABB",
    "Omron",
    "Mitsubishi Electric",
    "Phoenix Contact",
  ]);

  const openRequestPopup = (itemType) => {
    setRequestType(itemType);
    setNewItemName("");
    setShowRequestPopup(true);
  };

  const closeRequestPopup = () => {
    setShowRequestPopup(false);
    setRequestType("");
    setNewItemName("");
  };

  const handleAddRequestedItem = () => {
    const value = newItemName.trim();

    if (!value) {
      alert("Please enter a name.");
      return;
    }

    if (requestType === "brand") {
      const exists = brands.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      );

      if (exists) {
        alert("This brand already exists.");
        return;
      }

      setBrands((previous) => [...previous, value]);
      setBrand(value);
    }

    if (requestType === "category") {
      const exists = categories.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      );

      if (exists) {
        alert("This category already exists.");
        return;
      }

      setCategories((previous) => [...previous, value]);

      setProductTypes((previous) => ({
        ...previous,
        [value]: [],
      }));

      setCategory(value);
      setType("");
    }

    if (requestType === "type") {
      if (!category) {
        alert("Please select a category first.");
        return;
      }

      const currentTypes = productTypes[category] || [];

      const exists = currentTypes.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      );

      if (exists) {
        alert("This product type already exists.");
        return;
      }

      setProductTypes((previous) => ({
        ...previous,
        [category]: [...currentTypes, value],
      }));

      setType(value);
    }

    closeRequestPopup();
  };

  const handleCheckProduct = () => {
    const cleanedMpn = mpn.trim();

    if (!brand || !category || !type || !cleanedMpn) {
      alert("Please complete all required product identity fields.");
      return;
    }

    if (cleanedMpn.length > 150) {
      alert("MPN / Part Number must not exceed 150 characters.");
      return;
    }

    const productIdentity = {
      brand,
      category,
      type,
      mpn: cleanedMpn,
    };

    let matchResult;

    const testMpn = cleanedMpn.toUpperCase();

    if (testMpn.includes("EXACT")) {
      matchResult = {
        result: "EXACT_MATCH",
        master_product_id: 125,
        ariq_product_code: "ARQ-P-000125",
        product_name: "SIMATIC S7-1200 CPU 1215C",
        action: "ADD_OFFER",
      };
    } else if (testMpn.includes("POSSIBLE")) {
      matchResult = {
        result: "POSSIBLE_MATCH",
        action: "REVIEW_REQUIRED",

        possible_products: [
          {
            id: 125,
            code: "ARQ-P-000125",
            name: "SIMATIC S7-1200 CPU 1215C",
            mpn: "6ES7-215-1AG40-0XB0",
            match: "High similarity",
          },
          {
            id: 126,
            code: "ARQ-P-000126",
            name: "SIMATIC S7-1200 CPU 1214C",
            mpn: "6ES7-214-1AG40-0XB0",
            match: "Related model",
          },
        ],
      };
    } else {
      matchResult = {
        result: "NO_MATCH",
        action: "CREATE_NEW_PRODUCT",
        draft_submission_id: 884,
      };
    }

    console.log("================================");
    console.log("V-01 PRODUCT IDENTITY");
    console.log(productIdentity);

    console.log("V-02 MATCH RESULT");
    console.log(matchResult);

    console.log("================================");

    navigate("/products/match", {
      state: {
        productIdentity,
        matchResult,
      },
    });
  };

  const handleSaveDraft = () => {
    const draft = {
      step: "V-01",
      brand,
      category,
      type,
      mpn: mpn.trim(),
      status: "DRAFT",
    };

    localStorage.setItem(
      "arianiqs_product_identity_draft",
      JSON.stringify(draft)
    );

    alert("Product identity saved as draft.");
  };

  return (
    <div className="product-identity-page">

      <div className="product-page-header">
        <div className="product-header-left">

          {/* ONLY BACK NAVIGATION CHANGED */}
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div>
            <div className="product-eyebrow">
              PRODUCT CATALOG
            </div>

            <h1>Add Product</h1>

            <p>
              Identify the manufacturer product before adding
              product information or a vendor offer.
            </p>
          </div>

        </div>
      </div>

      <div className="product-step-card">

        <div className="product-step active">
          <div className="step-number">1</div>

          <div>
            <strong>Product Identity</strong>
            <span>Identify product</span>
          </div>
        </div>

        <div className="step-line"></div>

        <div className="product-step">
          <div className="step-number">2</div>

          <div>
            <strong>Product Match</strong>
            <span>Check catalog</span>
          </div>
        </div>

        <div className="step-line"></div>

        <div className="product-step">
          <div className="step-number">3</div>

          <div>
            <strong>Product Information</strong>
            <span>Complete details</span>
          </div>
        </div>

      </div>

      <div className="product-identity-layout">

        <section className="product-form-card">

          <div className="form-card-header">

            <div>
              <span className="form-step-label">
                ADD PRODUCT — STEP 1
              </span>

              <h2>Product Identity</h2>

              <p>
                Enter the official manufacturer identity of the
                product you want to sell.
              </p>
            </div>

            <div className="identity-check-icon">
              <Check size={20} />
            </div>

          </div>

          {/* BRAND */}

          <div className="form-field">

            <label>
              Brand / Manufacturer
              <span>*</span>
            </label>

            <div className="field-control searchable-select">

              <Search size={17} />

              <select
                value={brand}
                onChange={(event) =>
                  setBrand(event.target.value)
                }
              >
                <option value="">
                  Search manufacturer...
                </option>

                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />

            </div>

            <div className="field-help">
              Controlled ArianIQS master-data list.
              Vendors cannot create a new brand directly.
            </div>

            <button
              className="request-master-button"
              type="button"
              onClick={() => openRequestPopup("brand")}
            >
              <Plus size={15} />
              Request New Brand
            </button>

          </div>

          {/* CATEGORY */}

          <div className="form-field">

            <label>
              Category
              <span>*</span>
            </label>

            <div className="field-control">

              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setType("");
                }}
              >
                <option value="">
                  Select category...
                </option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />

            </div>

            <div className="field-help">
              Example: Industrial Automation,
              Electrical, Electronics, Mechanical,
              Pneumatics.
            </div>

            <button
              className="request-master-button"
              type="button"
              onClick={() => openRequestPopup("category")}
            >
              <Plus size={15} />
              Request New Category
            </button>

          </div>

          {/* PRODUCT TYPE */}

          <div className="form-field">

            <label>
              Product Type
              <span>*</span>
            </label>

            <div
              className={`field-control ${
                !category ? "field-disabled" : ""
              }`}
            >
              <select
                value={type}
                disabled={!category}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >
                <option value="">
                  {category
                    ? "Select product type..."
                    : "Select category first"}
                </option>

                {(productTypes[category] || []).map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>

              <ChevronDown size={16} />

            </div>

            <div className="field-help">
              Product Type depends on the selected category.
              Example: PLC, HMI, MCCB, Bearing, Cylinder.
            </div>

            <button
              className="request-master-button"
              type="button"
              onClick={() => openRequestPopup("type")}
            >
              <Plus size={15} />
              Request New Type
            </button>

          </div>

          {/* MPN */}

          <div className="form-field">

            <label>
              MPN / Part Number
              <span>*</span>
            </label>

            <input
              className="text-input"
              type="text"
              value={mpn}
              maxLength={150}
              placeholder="Enter manufacturer part number"
              onChange={(event) =>
                setMpn(event.target.value)
              }
            />

            <div className="field-bottom-info">

              <span>
                Preserve the manufacturer's official format.
              </span>

              <span>
                {mpn.length}/150
              </span>

            </div>

            <div className="field-help">
              Maximum 150 characters. Leading and trailing
              spaces will be removed before matching.
            </div>

          </div>

          {/* ACTIONS */}

          <div className="product-form-actions">

            <button
              className="secondary-product-button"
              type="button"
              onClick={handleSaveDraft}
            >
              <Save size={16} />
              Save Draft
            </button>

            <button
              className="primary-product-button"
              type="button"
              onClick={handleCheckProduct}
            >
              Check Product
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

        {/* INFORMATION PANEL */}

        <aside className="identity-info-card">

          <div className="info-card-icon">
            <Check size={19} />
          </div>

          <h3>
            Why product identity matters
          </h3>

          <p>
            ArianIQS checks the product identity before allowing
            a new product or vendor offer to be created.
          </p>

          <div className="identity-rule">
            <strong>
              Duplicate prevention
            </strong>

            <span>
              Brand + MPN are used as important product
              matching information.
            </span>
          </div>

          <div className="identity-rule">
            <strong>
              Master catalog control
            </strong>

            <span>
              Brand, Category and Product Type are controlled
              by ArianIQS master data.
            </span>
          </div>

          <div className="identity-rule">
            <strong>
              Existing products
            </strong>

            <span>
              If the product already exists, you will add your
              commercial offer instead of creating another
              master product.
            </span>
          </div>

          <div className="identity-rule">
            <strong>
              New products
            </strong>

            <span>
              If no approved product exists, you continue to
              the new product information workflow.
            </span>
          </div>

        </aside>

      </div>

      {/* REQUEST POPUP */}

      {showRequestPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeRequestPopup();
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              boxSizing: "border-box",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>

                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#55a846",
                    marginBottom: "5px",
                  }}
                >
                  MASTER DATA REQUEST
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    color: "#10232d",
                  }}
                >
                  {requestType === "brand"
                    ? "Request New Brand"
                    : requestType === "category"
                    ? "Request New Category"
                    : "Request New Type"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeRequestPopup}
                style={{
                  border: "0",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "6px",
                }}
              >
                <X size={20} />
              </button>

            </div>

            <div
              style={{
                marginBottom: "18px",
                fontSize: "14px",
                color: "#53646c",
              }}
            >
              Enter the new{" "}
              <strong>
                {requestType === "brand"
                  ? "Brand"
                  : requestType === "category"
                  ? "Category"
                  : "Product Type"}
              </strong>
              .
            </div>

            {requestType === "type" && category && (
              <div
                style={{
                  marginBottom: "18px",
                  fontSize: "14px",
                  color: "#53646c",
                }}
              >
                Selected Category:{" "}
                <strong>{category}</strong>
              </div>
            )}

            <input
              type="text"
              value={newItemName}
              onChange={(event) =>
                setNewItemName(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddRequestedItem();
                }

                if (event.key === "Escape") {
                  closeRequestPopup();
                }
              }}
              autoFocus
              placeholder={
                requestType === "brand"
                  ? "Enter brand name"
                  : requestType === "category"
                  ? "Enter category name"
                  : "Enter product type"
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                border: "1px solid #d6dee2",
                borderRadius: "7px",
                outline: "none",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={closeRequestPopup}
                style={{
                  padding: "10px 18px",
                  border: "1px solid #d6dee2",
                  borderRadius: "7px",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleAddRequestedItem}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "10px 18px",
                  border: "0",
                  borderRadius: "7px",
                  background: "#55a846",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductIdentity;