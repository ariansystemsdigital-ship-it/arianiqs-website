import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  FileText,
  Package,
  RefreshCw,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MyProducts.css";

const PRODUCT_DATA = [
  {
    id: 1,
    productCode: "ARQ-P-000125",
    productName: "SIMATIC S7-1200 CPU 1215C",
    brand: "Siemens",
    category: "Industrial Automation",
    type: "PLC",
    mpn: "6ES7-215-1AG40-0XB0",
    productStatus: "PUBLISHED",
    offerStatus: "ACTIVE",
    updated: "06 Oct 2026",
  },
  {
    id: 2,
    productCode: "ARQ-P-000184",
    productName: "Modicon M221 PLC",
    brand: "Schneider Electric",
    category: "Industrial Automation",
    type: "PLC",
    mpn: "TM221CE24R",
    productStatus: "UNDER_REVIEW",
    offerStatus: "DRAFT",
    updated: "05 Oct 2026",
  },
  {
    id: 3,
    productCode: "ARQ-P-000231",
    productName: "ACS355 Variable Frequency Drive",
    brand: "ABB",
    category: "Industrial Automation",
    type: "Drive",
    mpn: "ACS355-03E-08A8-4",
    productStatus: "CHANGES_REQUIRED",
    offerStatus: "PAUSED",
    updated: "04 Oct 2026",
  },
  {
    id: 4,
    productCode: "ARQ-P-000276",
    productName: "CJ2M CPU Unit",
    brand: "Omron",
    category: "Industrial Automation",
    type: "PLC",
    mpn: "CJ2M-CPU33",
    productStatus: "DRAFT",
    offerStatus: "DRAFT",
    updated: "03 Oct 2026",
  },
  {
    id: 5,
    productCode: "ARQ-P-000298",
    productName: "SIMATIC HMI Comfort Panel",
    brand: "Siemens",
    category: "Industrial Automation",
    type: "HMI",
    mpn: "6AV2124-0MC01-0AX0",
    productStatus: "SUBMITTED",
    offerStatus: "ACTIVE",
    updated: "02 Oct 2026",
  },
  {
    id: 6,
    productCode: "ARQ-P-000315",
    productName: "Industrial Proximity Sensor",
    brand: "Omron",
    category: "Sensors & Switches",
    type: "Proximity Sensor",
    mpn: "E2E-X5ME1",
    productStatus: "APPROVED",
    offerStatus: "OUT_OF_STOCK",
    updated: "30 Sep 2026",
  },
  {
    id: 7,
    productCode: "ARQ-P-000341",
    productName: "Industrial Motor Protection Breaker",
    brand: "ABB",
    category: "Safety & Protection",
    type: "Circuit Protection",
    mpn: "MS116-10",
    productStatus: "SUSPENDED",
    offerStatus: "SUSPENDED",
    updated: "28 Sep 2026",
  },
  {
    id: 8,
    productCode: "ARQ-P-000366",
    productName: "Industrial Ethernet Switch",
    brand: "Siemens",
    category: "Industrial Communication",
    type: "Ethernet Switch",
    mpn: "6GK5005-0BA00-1AB2",
    productStatus: "ARCHIVED",
    offerStatus: "PAUSED",
    updated: "25 Sep 2026",
  },
];

const PRODUCT_STATUSES = [
  "ALL",
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "CHANGES_REQUIRED",
  "APPROVED",
  "PUBLISHED",
  "SUSPENDED",
  "ARCHIVED",
];

function ProductStatusBadge({ status }) {
  const className = status.toLowerCase().replaceAll("_", "-");

  return (
    <span className={`product-status ${className}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

function OfferStatusBadge({ status }) {
  const className = status.toLowerCase().replaceAll("_", "-");

  return (
    <span className={`offer-status ${className}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

function MyProducts() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [openMenu, setOpenMenu] = useState(null);

  const categories = useMemo(() => {
    return [
      "ALL",
      ...new Set(PRODUCT_DATA.map((product) => product.category)),
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return PRODUCT_DATA.filter((product) => {
      const matchesSearch =
        !search ||
        product.productName.toLowerCase().includes(search) ||
        product.productCode.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.mpn.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        product.productStatus === statusFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        product.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  const handleView = (product) => {
    console.log("View product:", product.productCode);

    // Backend product-details route will be connected later.
  };

  const handleEdit = (product) => {
    console.log("Edit product:", product.productCode);

    if (
      product.productStatus === "DRAFT" ||
      product.productStatus === "CHANGES_REQUIRED"
    ) {
      navigate("/products/add");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
  };

  return (
    <div className="my-products-page">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="products-page-header">
        <div>
          <div className="products-breadcrumb">
            Catalog <span>/</span> My Products
          </div>

          <h1>My Products</h1>

          <p>
            Manage your product submissions and vendor offers in the
            ARIANIQS catalog.
          </p>
        </div>

        <button
          className="add-product-button"
          onClick={() => navigate("/products/add")}
        >
          <Plus size={18} />
          Add Product
        </button>
      </section>

      {/* =====================================================
          SUMMARY
      ====================================================== */}

      <section className="products-summary">
        <div className="summary-item">
          <div className="summary-icon">
            <Package size={19} />
          </div>

          <div>
            <span>Total Products</span>
            <strong>{PRODUCT_DATA.length}</strong>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <FileText size={19} />
          </div>

          <div>
            <span>Under Review</span>

            <strong>
              {
                PRODUCT_DATA.filter(
                  (product) =>
                    product.productStatus === "UNDER_REVIEW" ||
                    product.productStatus === "SUBMITTED"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <RefreshCw size={19} />
          </div>

          <div>
            <span>Changes Required</span>

            <strong>
              {
                PRODUCT_DATA.filter(
                  (product) =>
                    product.productStatus === "CHANGES_REQUIRED"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <Package size={19} />
          </div>

          <div>
            <span>Published</span>

            <strong>
              {
                PRODUCT_DATA.filter(
                  (product) =>
                    product.productStatus === "PUBLISHED"
                ).length
              }
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <section className="products-toolbar">
        {/* SEARCH */}

        <div className="products-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by product name, MPN, brand or product code..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        {/* PRODUCT STATUS FILTER */}

        <div className="toolbar-filter">
          <SlidersHorizontal size={17} />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            aria-label="Filter by product status"
          >
            {PRODUCT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === "ALL"
                  ? "All Product Status"
                  : status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORY FILTER */}

        <div className="toolbar-filter category-filter">
          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "ALL"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* =====================================================
          RESULT INFO
      ====================================================== */}

      <div className="products-result-bar">
        <div>
          Showing <strong>{filteredProducts.length}</strong> of{" "}
          <strong>{PRODUCT_DATA.length}</strong> products
        </div>

        {(searchTerm ||
          statusFilter !== "ALL" ||
          categoryFilter !== "ALL") && (
          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* =====================================================
          PRODUCT TABLE
      ====================================================== */}

      <section className="products-table-card">
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>BRAND / MPN</th>
                <th>PRODUCT CODE</th>
                <th>PRODUCT STATUS</th>
                <th>OFFER STATUS</th>
                <th>UPDATED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    {/* PRODUCT */}

                    <td>
                      <div className="product-name-cell">
                        <div className="product-image-placeholder">
                          <Package size={20} />
                        </div>

                        <div>
                          <strong>
                            {product.productName}
                          </strong>

                          <span>
                            {product.category} • {product.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* BRAND / MPN */}

                    <td>
                      <div className="brand-mpn-cell">
                        <strong>{product.brand}</strong>
                        <span>{product.mpn}</span>
                      </div>
                    </td>

                    {/* PRODUCT CODE */}

                    <td>
                      <span className="product-code">
                        {product.productCode}
                      </span>
                    </td>

                    {/* PRODUCT STATUS */}

                    <td>
                      <ProductStatusBadge
                        status={product.productStatus}
                      />
                    </td>

                    {/* OFFER STATUS */}

                    <td>
                      <OfferStatusBadge
                        status={product.offerStatus}
                      />
                    </td>

                    {/* UPDATED */}

                    <td>
                      <span className="updated-date">
                        {product.updated}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="product-actions-cell">
                      <button
                        className="more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === product.id
                              ? null
                              : product.id
                          )
                        }
                        aria-label="Product actions"
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {openMenu === product.id && (
                        <div className="product-action-menu">
                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              handleView(product);
                            }}
                          >
                            <Eye size={16} />
                            View Product
                          </button>

                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              handleEdit(product);
                            }}
                          >
                            <Pencil size={16} />
                            Edit Product
                          </button>

                          <button
                            onClick={() => {
                              setOpenMenu(null);

                              console.log(
                                "View submission:",
                                product.productCode
                              );
                            }}
                          >
                            <FileText size={16} />
                            Submission Details
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-products">
                      <div className="empty-products-icon">
                        <Package size={28} />
                      </div>

                      <h3>No products found</h3>

                      <p>
                        No products match your current search or
                        filters.
                      </p>

                      <button onClick={clearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          FOOTNOTE
      ====================================================== */}

      <div className="products-page-note">
        <strong>
          Product status and offer status are separate.
        </strong>

        <span>
          Product approval controls the master catalog record,
          while the vendor offer controls your commercial
          availability.
        </span>
      </div>
    </div>
  );
}

export default MyProducts;