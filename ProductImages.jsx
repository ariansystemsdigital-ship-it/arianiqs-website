import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  Trash2,
  Upload,
  Info,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductImage.css";

const MAX_ADDITIONAL_IMAGES = 10;
const MAX_NAMEPLATE_IMAGES = 3;
const MAX_PACKAGING_IMAGES = 3;
const MAX_INSTALLATION_IMAGES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function ProductImages() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productIdentity,
    productInformation,
    features = [],
    applications = [],
    includedItems = [],
    excludedItems = [],
    technicalSpecifications = [],
  } = location.state || {};

  const identity = productIdentity || {
    brand: "Siemens",
    category: "Industrial Automation",
    subCategory: "",
    productName: "simatic s71200",
    condition: "New Product",
  };

  const [primaryImage, setPrimaryImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [nameplateImages, setNameplateImages] = useState([]);
  const [packagingImages, setPackagingImages] = useState([]);
  const [installationImages, setInstallationImages] = useState([]);

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const totalImages = useMemo(
    () =>
      (primaryImage ? 1 : 0) +
      additionalImages.length +
      nameplateImages.length +
      packagingImages.length +
      installationImages.length,
    [
      primaryImage,
      additionalImages,
      nameplateImages,
      packagingImages,
      installationImages,
    ]
  );

  const createImageObject = (file, type) => ({
    id: `${type}-${Date.now()}-${Math.random()}`,
    file,
    type,
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  });

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG, PNG or WebP images are allowed.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Maximum file size is 10 MB per image.";
    }

    return null;
  };

  const handlePrimaryImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);

    if (error) {
      setErrors((prev) => ({ ...prev, primary: error }));
      return;
    }

    if (primaryImage?.url) {
      URL.revokeObjectURL(primaryImage.url);
    }

    setPrimaryImage(createImageObject(file, "primary"));
    setErrors((prev) => ({ ...prev, primary: "" }));
    setSaved(false);
  };

  const handleMultipleImages = (
    event,
    currentImages,
    setImages,
    max,
    errorKey,
    type
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const remaining = max - currentImages.length;

    if (files.length > remaining) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: `Maximum ${max} images allowed.`,
      }));
    }

    const validFiles = files.slice(0, remaining);

    const newImages = [];

    validFiles.forEach((file) => {
      const error = validateFile(file);

      if (!error) {
        newImages.push(createImageObject(file, type));
      }
    });

    if (newImages.length) {
      setImages((prev) => [...prev, ...newImages]);
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
      setSaved(false);
    }

    event.target.value = "";
  };

  const removeImage = (image, setImages) => {
    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }

    setImages((prev) => prev.filter((item) => item.id !== image.id));
    setSaved(false);
  };

  const validatePage = () => {
    const nextErrors = {};

    if (!primaryImage) {
      nextErrors.primary = "Primary product image is required.";
    }

    if (additionalImages.length === 0) {
      nextErrors.additional =
        "Add at least one additional product image.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const saveDraft = () => {
    localStorage.setItem(
      "arianiqs_product_images_draft",
      JSON.stringify({
        productName: identity.productName,
        brand: identity.brand,
        category: identity.category,
        primaryImage: primaryImage
          ? {
              name: primaryImage.name,
              size: primaryImage.size,
            }
          : null,
        additionalImages: additionalImages.map((image) => ({
          name: image.name,
          size: image.size,
        })),
        nameplateImages: nameplateImages.map((image) => ({
          name: image.name,
          size: image.size,
        })),
        packagingImages: packagingImages.map((image) => ({
          name: image.name,
          size: image.size,
        })),
        installationImages: installationImages.map((image) => ({
          name: image.name,
          size: image.size,
        })),
      })
    );

    setSaved(true);
  };

  const goBack = () => {
    navigate("/products/technical-specifications", {
      state: {
        productIdentity: identity,
        productInformation,
        features,
        applications,
        includedItems,
        excludedItems,
      },
    });
  };

  const goNext = () => {
    if (!validatePage()) return;

    navigate("/products/documents", {
      state: {
        productIdentity: identity,
        productInformation,
        features,
        applications,
        includedItems,
        excludedItems,
        technicalSpecifications,
        primaryImage,
        additionalImages,
        nameplateImages,
        packagingImages,
        installationImages,
      },
    });
  };

  const renderImagePreview = (image, setImages) => (
    <div className="pi-image-preview" key={image.id}>
      <img src={image.url} alt={image.name} />

      <div className="pi-image-preview-info">
        <span title={image.name}>{image.name}</span>
        <small>{(image.size / 1024 / 1024).toFixed(2)} MB</small>
      </div>

      <button
        type="button"
        className="pi-remove-btn"
        onClick={() => removeImage(image, setImages)}
        title="Remove image"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );

  const renderUploadBox = ({
    title,
    description,
    count,
    max,
    type,
    images,
    setImages,
    errorKey,
    acceptMultiple = true,
    icon = <ImagePlus size={24} />,
  }) => (
    <section className="pi-section-card">
      <div className="pi-section-header">
        <div>
          <div className="pi-section-title-row">
            <h2>{title}</h2>
            <span className="pi-count">
              {images.length}/{max}
            </span>
          </div>
          <p>{description}</p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="pi-image-grid">
          {images.map((image) =>
            renderImagePreview(image, setImages)
          )}
        </div>
      )}

      {images.length < max && (
        <label className="pi-upload-box">
          <div className="pi-upload-icon">{icon}</div>

          <strong>
            Upload {title}
          </strong>

          <span>JPG, PNG or WebP</span>
          <small>Maximum 10 MB per image</small>

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            multiple={acceptMultiple}
            onChange={(event) =>
              handleMultipleImages(
                event,
                images,
                setImages,
                max,
                errorKey,
                type
              )
            }
          />
        </label>
      )}

      {errors[errorKey] && (
        <div className="pi-error">
          <Info size={15} />
          {errors[errorKey]}
        </div>
      )}
    </section>
  );

  return (
    <div className="product-images-page">

      {/* HEADER */}
      <header className="pi-page-header">
        <div>
          <span className="pi-eyebrow">PRODUCT CREATION</span>

          <div className="pi-title-row">
            <h1>Product Images</h1>
            <span className="pi-step-badge">STEP 6 OF 10</span>
          </div>

          <p>
            Add product images and visual evidence required for the
            customer-facing product record.
          </p>
        </div>
      </header>

      {/* NAVIGATOR — KEEPING CURRENT WORKING DESIGN */}
      <div className="product-progress">
        <div className="product-progress-step completed">
          <span className="progress-number">✓</span>
          <span className="progress-label">Identity</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">✓</span>
          <span className="progress-label">Match Result</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">✓</span>
          <span className="progress-label">Basic Information</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">✓</span>
          <span className="progress-label">Features & Applications</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step completed">
          <span className="progress-number">✓</span>
          <span className="progress-label">Technical Specifications</span>
        </div>

        <div className="product-progress-line active" />

        <div className="product-progress-step active">
          <span className="progress-number">6</span>
          <span className="progress-label">Images</span>
        </div>

        <div className="product-progress-line" />

        <div className="product-progress-step">
          <span className="progress-number">7</span>
          <span className="progress-label">Documents</span>
        </div>
      </div>

      {/* PRODUCT SUMMARY */}
      <section className="pi-product-summary">
        <div className="pi-product-main">
          <span>PRODUCT</span>
          <strong>{identity.productName || "simatic s71200"}</strong>
        </div>

        <div>
          <span>BRAND</span>
          <strong>{identity.brand || "Siemens"}</strong>
        </div>

        <div>
          <span>CATEGORY</span>
          <strong>
            {identity.category || "Industrial Automation"}
          </strong>
        </div>

        <div>
          <span>SUB-CATEGORY</span>
          <strong>{identity.subCategory || "—"}</strong>
        </div>
      </section>

      {/* MAIN PAGE */}
      <div className="pi-layout">

        {/* LEFT */}
        <main className="pi-main-content">

          {/* PRIMARY IMAGE */}
          <section className="pi-primary-card">
            <div className="pi-section-header">
              <div>
                <div className="pi-section-title-row">
                  <h2>Primary Product Image</h2>
                  <span className="pi-required">REQUIRED</span>
                </div>

                <p>
                  Main product image used for the customer-facing
                  product record.
                </p>

                <small className="pi-guideline-text">
                  Recommended: 1000 × 1000 pixels or higher • JPG,
                  PNG or WebP • Maximum 10 MB
                </small>
              </div>
            </div>

            {primaryImage ? (
              <div className="pi-primary-preview">
                <img
                  src={primaryImage.url}
                  alt={primaryImage.name}
                />

                <div className="pi-primary-info">
                  <CheckCircle2 size={18} />

                  <div>
                    <strong>{primaryImage.name}</strong>
                    <span>
                      {(primaryImage.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(primaryImage.url);
                      setPrimaryImage(null);
                    }}
                  >
                    Replace
                  </button>
                </div>
              </div>
            ) : (
              <label className="pi-primary-upload">
                <div className="pi-primary-icon">
                  <Upload size={28} />
                </div>

                <strong>Upload Primary Image</strong>

                <span>Choose one product image</span>

                <small>JPG, PNG or WebP</small>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={handlePrimaryImage}
                />
              </label>
            )}

            {errors.primary && (
              <div className="pi-error">
                <Info size={15} />
                {errors.primary}
              </div>
            )}
          </section>

          {/* ADDITIONAL */}
          {renderUploadBox({
            title: "Additional Images",
            description:
              "Add front, rear, side, detail or other product views.",
            count: additionalImages.length,
            max: MAX_ADDITIONAL_IMAGES,
            type: "additional",
            images: additionalImages,
            setImages: setAdditionalImages,
            errorKey: "additional",
          })}

          {/* TWO COLUMN SECONDARY */}
          <div className="pi-two-column">

            {renderUploadBox({
              title: "Nameplate / Label",
              description:
                "Upload a clear image showing the model or part number where applicable.",
              count: nameplateImages.length,
              max: MAX_NAMEPLATE_IMAGES,
              type: "nameplate",
              images: nameplateImages,
              setImages: setNameplateImages,
              errorKey: "nameplate",
            })}

            {renderUploadBox({
              title: "Packaging",
              description:
                "Show the package or box condition when useful.",
              count: packagingImages.length,
              max: MAX_PACKAGING_IMAGES,
              type: "packaging",
              images: packagingImages,
              setImages: setPackagingImages,
              errorKey: "packaging",
            })}
          </div>

          {/* INSTALLATION */}
          {renderUploadBox({
            title: "Installation / Application",
            description:
              "Show the product installed or used in an application.",
            count: installationImages.length,
            max: MAX_INSTALLATION_IMAGES,
            type: "installation",
            images: installationImages,
            setImages: setInstallationImages,
            errorKey: "installation",
          })}

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="pi-sidebar">

          <section className="pi-side-card">
            <div className="pi-side-title">
              <Info size={17} />
              <h3>Image Guidelines</h3>
            </div>

            <p>
              Use clear product images that accurately represent
              the item being offered.
            </p>

            <ul className="pi-check-list">
              <li>Clear product photography</li>
              <li>Recommended 1000 × 1000+</li>
              <li>JPG, PNG or WebP</li>
              <li>Maximum 10 MB</li>
            </ul>
          </section>

          <section className="pi-side-card">
            <span className="pi-side-label">CUSTOMER VIEW</span>

            <h3>What customers will see</h3>

            <ul className="pi-customer-list">
              <li>Main product image</li>
              <li>Additional product views</li>
              <li>Approved installation images</li>
              <li>Approved visual evidence</li>
            </ul>
          </section>

          <section className="pi-side-card">
            <div className="pi-status-heading">
              <h3>Image Status</h3>
              <span className="pi-status-badge">
                {primaryImage && additionalImages.length
                  ? "READY"
                  : "IN PROGRESS"}
              </span>
            </div>

            <div className="pi-status-grid">
              <div>
                <span>Primary</span>
                <strong>{primaryImage ? 1 : 0}</strong>
              </div>

              <div>
                <span>Additional</span>
                <strong>{additionalImages.length}</strong>
              </div>

              <div>
                <span>Nameplate</span>
                <strong>{nameplateImages.length}</strong>
              </div>

              <div>
                <span>Packaging</span>
                <strong>{packagingImages.length}</strong>
              </div>

              <div>
                <span>Installation</span>
                <strong>{installationImages.length}</strong>
              </div>

              <div className="pi-total-status">
                <span>Total Images</span>
                <strong>{totalImages}</strong>
              </div>
            </div>
          </section>

          <section className="pi-side-card">
            <span className="pi-side-label">PRODUCTION WORKFLOW</span>

            <h3>Image review</h3>

            <p>
              Uploaded images become part of the product record
              and may be reviewed before publication.
            </p>
          </section>

        </aside>
      </div>

      {/* ACTION BAR */}
      <footer className="pi-action-bar">
        <button
          type="button"
          className="pi-btn pi-btn-secondary"
          onClick={goBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="pi-action-right">
          <button
            type="button"
            className="pi-btn pi-btn-light"
            onClick={saveDraft}
          >
            {saved ? "Draft Saved" : "Save Draft"}
          </button>

          <button
            type="button"
            className="pi-btn pi-btn-primary"
            onClick={goNext}
          >
            Continue to Documents
            <ArrowRight size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ProductImages;