import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Upload,
  Trash2,
  Eye,
  Info,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDocuments.css";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const DOCUMENT_TYPES = [
  {
    id: "datasheet",
    title: "Datasheet",
    description: "Technical product specifications and manufacturer data.",
    required: true,
    formats: "PDF",
  },
  {
    id: "manual",
    title: "Product Manual",
    description: "Installation, operation and maintenance documentation.",
    required: false,
    formats: "PDF",
  },
  {
    id: "catalogue",
    title: "Manufacturer Catalogue",
    description: "Official manufacturer catalogue or product reference.",
    required: false,
    formats: "PDF",
  },
  {
    id: "certificate",
    title: "Certificate",
    description: "Quality, product or applicable certification evidence.",
    required: false,
    formats: "PDF, JPG, PNG",
  },
  {
    id: "compliance",
    title: "Compliance Document",
    description: "Applicable compliance, declaration or regulatory documentation.",
    required: false,
    formats: "PDF",
  },
  {
    id: "other",
    title: "Other Supporting Document",
    description: "Additional technical documentation supporting the product.",
    required: false,
    formats: "PDF, JPG, PNG",
  },
];

function ProductDocuments() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productIdentity,
    productInformation,
    features,
    applications,
    includedItems,
    excludedItems,
    technicalSpecifications,
    images,
  } = location.state || {};

  const identity = productIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    subCategory: "",
    productName: "simatic s71200",
    condition: "New Product",
  };

  const [documents, setDocuments] = useState({});
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const totalDocuments = useMemo(
    () => Object.keys(documents).length,
    [documents]
  );

  const customerVisibleCount = useMemo(
    () =>
      Object.values(documents).filter(
        (document) => document.customerVisibility === "Yes"
      ).length,
    [documents]
  );

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }

    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  };

  const validateFile = (file, documentType) => {
    if (!file) {
      return "Please select a document.";
    }

    const extension = file.name.split(".").pop()?.toLowerCase();

    const validExtension =
      ["pdf", "jpg", "jpeg", "png"].includes(extension);

    if (!validExtension) {
      return "Only PDF, JPG or PNG files are allowed.";
    }

    if (!ACCEPTED_DOCUMENT_TYPES.includes(file.type)) {
      return "The selected file type is not supported.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Maximum document size is 25 MB.";
    }

    if (documentType === "datasheet" && extension !== "pdf") {
      return "Datasheet must be uploaded as a PDF.";
    }

    if (
      ["manual", "catalogue", "compliance"].includes(documentType) &&
      extension !== "pdf"
    ) {
      return "This document must be uploaded as a PDF.";
    }

    return "";
  };

  const handleUpload = (event, documentType) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const error = validateFile(file, documentType);

    if (error) {
      setErrors((previous) => ({
        ...previous,
        [documentType]: error,
      }));
      return;
    }

    setErrors((previous) => {
      const next = { ...previous };
      delete next[documentType];
      return next;
    });

    setSaved(false);

    setDocuments((previous) => ({
      ...previous,
      [documentType]: {
        id: `${documentType}-${Date.now()}`,
        type: documentType,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        title:
          DOCUMENT_TYPES.find((item) => item.id === documentType)?.title ||
          "Product Document",
        version: "Rev A",
        customerVisibility:
          documentType === "datasheet" || documentType === "manual"
            ? "Yes"
            : "Review",
        status: "Uploaded",
        uploadedAt: new Date().toISOString(),
        file,
      },
    }));

    event.target.value = "";
  };

  const removeDocument = (documentType) => {
    setDocuments((previous) => {
      const next = { ...previous };
      delete next[documentType];
      return next;
    });

    setErrors((previous) => {
      const next = { ...previous };
      delete next[documentType];
      return next;
    });

    setSaved(false);
  };

  const updateDocument = (documentType, field, value) => {
    setDocuments((previous) => ({
      ...previous,
      [documentType]: {
        ...previous[documentType],
        [field]: value,
      },
    }));

    setSaved(false);
  };

  const validateBeforeContinue = () => {
    const nextErrors = {};

    if (!documents.datasheet) {
      nextErrors.datasheet = "Datasheet is required for this product.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const saveDraft = () => {
    const draftDocuments = Object.fromEntries(
      Object.entries(documents).map(([key, value]) => [
        key,
        {
          ...value,
          file: undefined,
        },
      ])
    );

    localStorage.setItem(
      "arianiqs_product_documents_draft",
      JSON.stringify({
        productIdentity: identity,
        documents: draftDocuments,
        savedAt: new Date().toISOString(),
      })
    );

    setSaved(true);
  };

  const handleBack = () => {
    navigate("/products/images", {
      state: {
        productIdentity: identity,
        productInformation,
        features,
        applications,
        includedItems,
        excludedItems,
        technicalSpecifications,
        images,
      },
    });
  };

  const handleContinue = () => {
    if (!validateBeforeContinue()) {
      return;
    }

    navigate("/products/search-filter", {
      state: {
        productIdentity: identity,
        productInformation,
        features,
        applications,
        includedItems,
        excludedItems,
        technicalSpecifications,
        images,
        documents,
      },
    });
  };

  return (
    <div className="product-documents-page">
      <section className="product-documents-header">
        <div>
          <span className="documents-eyebrow">PRODUCT CREATION</span>

          <h1>Product Documents</h1>

          <p>
            Add technical documentation required for product verification
            and approved customer access.
          </p>
        </div>

        <div className="documents-step-badge">
          STEP 7 OF 10
        </div>
      </section>

      {/* NAVIGATOR */}
      <div className="product-progress">
        <div className="product-progress-step completed">
          <span className="progress-number">
            <CheckCircle2 size={15} />
          </span>
          <span className="progress-label">Identity</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">
            <CheckCircle2 size={15} />
          </span>
          <span className="progress-label">Match Result</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">
            <CheckCircle2 size={15} />
          </span>
          <span className="progress-label">Basic Information</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">
            <CheckCircle2 size={15} />
          </span>
          <span className="progress-label">Features & Applications</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">
            <CheckCircle2 size={15} />
          </span>
          <span className="progress-label">Technical Specifications</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">
            <CheckCircle2 size={15} />
          </span>
          <span className="progress-label">Images</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step active">
          <span className="progress-number">7</span>
          <span className="progress-label">Documents</span>
        </div>
      </div>

      {/* PRODUCT SUMMARY */}
      <section className="documents-summary">
        <div>
          <span>PRODUCT</span>
          <strong>{identity.productName}</strong>
        </div>

        <div>
          <span>BRAND</span>
          <strong>{identity.brand}</strong>
        </div>

        <div>
          <span>CATEGORY</span>
          <strong>{identity.category}</strong>
        </div>

        <div>
          <span>SUB-CATEGORY</span>
          <strong>{identity.subCategory || "—"}</strong>
        </div>
      </section>

      <div className="documents-layout">
        <main className="documents-main">
          <div className="documents-section-heading">
            <div>
              <span className="section-kicker">TECHNICAL EVIDENCE</span>
              <h2>Product Documentation</h2>
              <p>
                Upload official product documents used for Arianiqs
                verification and customer-facing product information.
              </p>
            </div>

            <div className="document-count">
              {totalDocuments} / 6
            </div>
          </div>

          {/* DOCUMENT CARDS */}
          <div className="documents-list">
            {DOCUMENT_TYPES.map((documentType) => {
              const document = documents[documentType.id];
              const error = errors[documentType.id];

              return (
                <article
                  className={`document-card ${
                    document ? "has-document" : ""
                  } ${error ? "has-error" : ""}`}
                  key={documentType.id}
                >
                  <div className="document-card-top">
                    <div className="document-icon">
                      <FileText size={21} />
                    </div>

                    <div className="document-heading">
                      <div className="document-title-row">
                        <h3>{documentType.title}</h3>

                        {documentType.required ? (
                          <span className="required-badge">
                            REQUIRED
                          </span>
                        ) : (
                          <span className="optional-badge">
                            OPTIONAL
                          </span>
                        )}
                      </div>

                      <p>{documentType.description}</p>

                      <span className="document-format">
                        Supported: {documentType.formats}
                      </span>
                    </div>
                  </div>

                  {!document ? (
                    <div className="document-upload-area">
                      <input
                        id={`document-${documentType.id}`}
                        type="file"
                        accept={
                          documentType.formats === "PDF"
                            ? ".pdf,application/pdf"
                            : ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                        }
                        onChange={(event) =>
                          handleUpload(event, documentType.id)
                        }
                        hidden
                      />

                      <label
                        htmlFor={`document-${documentType.id}`}
                        className="document-upload-button"
                      >
                        <Upload size={17} />
                        Choose Document
                      </label>

                      <span className="document-upload-hint">
                        Maximum 25 MB
                      </span>
                    </div>
                  ) : (
                    <div className="document-file-area">
                      <div className="document-file-info">
                        <div className="file-preview">
                          <FileText size={20} />
                        </div>

                        <div>
                          <strong>{document.fileName}</strong>

                          <span>
                            {formatFileSize(document.fileSize)} •{" "}
                            {document.status}
                          </span>
                        </div>
                      </div>

                      <div className="document-file-actions">
                        <button
                          type="button"
                          className="icon-button"
                          title="View document"
                          onClick={() => {
                            if (document.file) {
                              const url = URL.createObjectURL(
                                document.file
                              );
                              window.open(url, "_blank");
                            }
                          }}
                        >
                          <Eye size={17} />
                        </button>

                        <label
                          htmlFor={`replace-${documentType.id}`}
                          className="icon-button"
                          title="Replace document"
                        >
                          <Upload size={17} />
                        </label>

                        <input
                          id={`replace-${documentType.id}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(event) =>
                            handleUpload(event, documentType.id)
                          }
                          hidden
                        />

                        <button
                          type="button"
                          className="icon-button danger"
                          title="Delete document"
                          onClick={() =>
                            removeDocument(documentType.id)
                          }
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  )}

                  {document && (
                    <div className="document-metadata">
                      <div className="metadata-field">
                        <label>Document Title</label>
                        <input
                          type="text"
                          value={document.title}
                          onChange={(event) =>
                            updateDocument(
                              documentType.id,
                              "title",
                              event.target.value
                            )
                          }
                        />
                      </div>

                      <div className="metadata-field small-field">
                        <label>Version</label>
                        <input
                          type="text"
                          value={document.version}
                          onChange={(event) =>
                            updateDocument(
                              documentType.id,
                              "version",
                              event.target.value
                            )
                          }
                        />
                      </div>

                      <div className="metadata-field">
                        <label>Customer Visibility</label>
                        <select
                          value={document.customerVisibility}
                          onChange={(event) =>
                            updateDocument(
                              documentType.id,
                              "customerVisibility",
                              event.target.value
                            )
                          }
                        >
                          <option value="Yes">Yes</option>
                          <option value="Review">
                            Review Required
                          </option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="document-error">
                      <Info size={15} />
                      {error}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="document-policy-note">
            <Info size={17} />

            <div>
              <strong>Document security</strong>

              <p>
                Uploaded files will require backend file-type
                verification, security scanning and controlled storage
                before publication. Customer visibility is subject to
                Arianiqs review and approval.
              </p>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="documents-sidebar">
          <section className="sidebar-card">
            <div className="sidebar-card-header">
              <FileText size={18} />
              <h3>Document Guidelines</h3>
            </div>

            <ul className="guidelines-list">
              <li>Use official manufacturer documentation.</li>
              <li>Keep document titles clear and meaningful.</li>
              <li>Use the correct document version or revision.</li>
              <li>Maximum recommended size is 25 MB per document.</li>
              <li>Customer visibility is controlled by approval.</li>
            </ul>
          </section>

          <section className="sidebar-card">
            <div className="sidebar-card-header">
              <Eye size={18} />
              <h3>Customer Visibility</h3>
            </div>

            <div className="visibility-info">
              <div>
                <span>Customer Visible</span>
                <strong>{customerVisibleCount}</strong>
              </div>

              <div>
                <span>Review Required</span>
                <strong>
                  {
                    Object.values(documents).filter(
                      (document) =>
                        document.customerVisibility === "Review"
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>Private</span>
                <strong>
                  {
                    Object.values(documents).filter(
                      (document) =>
                        document.customerVisibility === "No"
                    ).length
                  }
                </strong>
              </div>
            </div>
          </section>

          <section className="sidebar-card">
            <div className="sidebar-card-header">
              <CheckCircle2 size={18} />
              <h3>Document Status</h3>
            </div>

            <div className="document-status-grid">
              <div>
                <span>Total Documents</span>
                <strong>{totalDocuments}</strong>
              </div>

              <div>
                <span>Datasheet</span>
                <strong className={documents.datasheet ? "done" : ""}>
                  {documents.datasheet ? "Uploaded" : "Required"}
                </strong>
              </div>

              <div>
                <span>Optional</span>
                <strong>
                  {Math.max(totalDocuments - (documents.datasheet ? 1 : 0), 0)}
                </strong>
              </div>
            </div>
          </section>

          <section className="sidebar-card workflow-card">
            <div className="sidebar-card-header">
              <CheckCircle2 size={18} />
              <h3>Production Workflow</h3>
            </div>

            <div className="workflow-list">
              <div className="workflow-item completed">
                <span>✓</span>
                <div>
                  <strong>Product Information</strong>
                  <small>Completed</small>
                </div>
              </div>

              <div className="workflow-item completed">
                <span>✓</span>
                <div>
                  <strong>Technical Specifications</strong>
                  <small>Completed</small>
                </div>
              </div>

              <div className="workflow-item completed">
                <span>✓</span>
                <div>
                  <strong>Product Images</strong>
                  <small>Completed</small>
                </div>
              </div>

              <div className="workflow-item active">
                <span>7</span>
                <div>
                  <strong>Product Documents</strong>
                  <small>Current step</small>
                </div>
              </div>

              <div className="workflow-item">
                <span>8</span>
                <div>
                  <strong>Search & Filter</strong>
                  <small>Next</small>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* ACTION BAR */}
      <div className="documents-action-bar">
        <button
          type="button"
          className="action-button secondary"
          onClick={handleBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="action-right">
          {saved && (
            <span className="draft-saved">
              <CheckCircle2 size={15} />
              Draft saved
            </span>
          )}

          <button
            type="button"
            className="action-button draft"
            onClick={saveDraft}
          >
            Save Draft
          </button>

          <button
            type="button"
            className="action-button primary"
            onClick={handleContinue}
          >
            Continue to Search & Filter
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDocuments;