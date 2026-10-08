import React, { useState } from "react";
import {
  Building2,
  FileCheck2,
  Landmark,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
} from "lucide-react";
import "./Verification.css";

const INITIAL_FORM = {
  legalCompanyName: "",
  tradeName: "",
  companyType: "",
  country: "",
  state: "",
  city: "",
  registeredAddress: "",
  businessEmail: "",
  businessPhone: "",
  website: "",
  registrationNumber: "",
  gstNumber: "",
  bankName: "",
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
};

const INITIAL_DOCUMENTS = {
  registrationCertificate: null,
  taxCertificate: null,
  addressProof: null,
  bankProof: null,
  authorizationDocument: null,
};

const Verification = () => {
  const [status, setStatus] = useState("PROFILE INCOMPLETE");

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (event, documentName) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setDocuments((previous) => ({
      ...previous,
      [documentName]: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus("VERIFICATION PENDING");
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getStatusIcon = () => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle2 size={20} />;

      case "VERIFICATION PENDING":
      case "UNDER REVIEW":
        return <Clock3 size={20} />;

      case "CHANGES REQUIRED":
        return <AlertCircle size={20} />;

      case "REJECTED":
        return <XCircle size={20} />;

      default:
        return <AlertCircle size={20} />;
    }
  };

  const isSubmitted =
    status === "VERIFICATION PENDING" ||
    status === "UNDER REVIEW" ||
    status === "VERIFIED";

  return (
    <div className="verification-page">
      {/* PAGE HEADER */}
      <div className="verification-header">
        <div className="verification-title-area">
          <span className="page-eyebrow">VENDOR VERIFICATION</span>

          <h1>Verification</h1>

          <p>
            Complete your company information and supporting documents for
            Arianiqs vendor verification.
          </p>
        </div>

        <div className="verification-status">
          <div className="status-icon">{getStatusIcon()}</div>

          <div className="status-content">
            <span>Verification Status</span>
            <strong>{status}</strong>
          </div>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <div className="submission-success">
          <div className="success-icon">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <strong>Verification submitted successfully</strong>

            <p>
              Your verification information is now pending Arianiqs review.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* COMPANY INFORMATION */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <Building2 size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Company Information</h2>

              <p>
                Provide the basic legal and business identity information.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <FormField
              label="Legal Company Name"
              required
              name="legalCompanyName"
              value={formData.legalCompanyName}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="Trade Name"
              name="tradeName"
              value={formData.tradeName}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <div className="form-group">
              <label htmlFor="companyType">
                Company Type <span>*</span>
              </label>

              <select
                id="companyType"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                disabled={isSubmitted}
                required
              >
                <option value="">Select company type</option>
                <option value="PRIVATE_LIMITED">Private Limited</option>
                <option value="PUBLIC_LIMITED">Public Limited</option>
                <option value="LLP">LLP</option>
                <option value="PARTNERSHIP">Partnership</option>
                <option value="PROPRIETORSHIP">Proprietorship</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* BUSINESS ADDRESS */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <Building2 size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Business Address</h2>

              <p>Enter the registered business location.</p>
            </div>
          </div>

          <div className="form-grid">
            <FormField
              label="Country"
              required
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="State"
              required
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="City"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <div className="form-group full-width">
              <label htmlFor="registeredAddress">
                Registered Address <span>*</span>
              </label>

              <textarea
                id="registeredAddress"
                name="registeredAddress"
                value={formData.registeredAddress}
                onChange={handleChange}
                disabled={isSubmitted}
                rows="4"
                required
              />
            </div>
          </div>
        </section>

        {/* BUSINESS CONTACT */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <ShieldCheck size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Business Contact</h2>

              <p>Provide the official business contact details.</p>
            </div>
          </div>

          <div className="form-grid">
            <FormField
              label="Business Email"
              required
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="Business Phone"
              required
              type="tel"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="Business Website"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={isSubmitted}
              placeholder="https://"
              fullWidth
            />
          </div>
        </section>

        {/* BUSINESS REGISTRATION */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <FileCheck2 size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Business Registration</h2>

              <p>
                Enter the official company registration information.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <FormField
              label="Company Registration Number"
              required
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              disabled={isSubmitted}
            />
          </div>
        </section>

        {/* TAX INFORMATION */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <FileCheck2 size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Tax Information</h2>

              <p>
                Provide the applicable tax registration information.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <FormField
              label="GST / Tax Registration Details"
              required
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              disabled={isSubmitted}
            />
          </div>
        </section>

        {/* BANK VERIFICATION */}
        <section className="verification-card private-section">
          <div className="section-heading">
            <div className="section-icon">
              <Landmark size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Bank Verification</h2>

              <p>
                Bank verification information is private and is not intended
                for customer marketplace display.
              </p>
            </div>

            <span className="private-badge">PRIVATE</span>
          </div>

          <div className="form-grid">
            <FormField
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="Account Holder Name"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="Account Number"
              name="accountNumber"
              type="password"
              value={formData.accountNumber}
              onChange={handleChange}
              disabled={isSubmitted}
            />

            <FormField
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              disabled={isSubmitted}
            />
          </div>
        </section>

        {/* SUPPORTING DOCUMENTS */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <Upload size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Supporting Documents</h2>

              <p>
                Upload the documents required for business verification.
              </p>
            </div>
          </div>

          <div className="document-list">
            <DocumentUpload
              label="Registration Certificate"
              documentName="registrationCertificate"
              file={documents.registrationCertificate}
              onChange={handleFileChange}
              disabled={isSubmitted}
            />

            <DocumentUpload
              label="Tax Certificate"
              documentName="taxCertificate"
              file={documents.taxCertificate}
              onChange={handleFileChange}
              disabled={isSubmitted}
            />

            <DocumentUpload
              label="Address Proof"
              documentName="addressProof"
              file={documents.addressProof}
              onChange={handleFileChange}
              disabled={isSubmitted}
            />

            <DocumentUpload
              label="Bank Proof"
              documentName="bankProof"
              file={documents.bankProof}
              onChange={handleFileChange}
              disabled={isSubmitted}
            />

            <DocumentUpload
              label="Authorization Document"
              documentName="authorizationDocument"
              file={documents.authorizationDocument}
              onChange={handleFileChange}
              disabled={isSubmitted}
            />
          </div>
        </section>

        {/* VERIFICATION PROCESS */}
        <section className="verification-card">
          <div className="section-heading">
            <div className="section-icon">
              <ShieldCheck size={21} />
            </div>

            <div className="section-heading-text">
              <h2>Verification Process</h2>

              <p>
                Your verification moves through the Arianiqs review process.
              </p>
            </div>
          </div>

          <div className="verification-flow">
            <FlowStep
              number="01"
              title="Profile Incomplete"
              active={status === "PROFILE INCOMPLETE"}
              completed={isSubmitted}
            />

            <div className="flow-line" />

            <FlowStep
              number="02"
              title="Verification Pending"
              active={status === "VERIFICATION PENDING"}
              completed={
                status === "UNDER REVIEW" || status === "VERIFIED"
              }
            />

            <div className="flow-line" />

            <FlowStep
              number="03"
              title="Under Review"
              active={status === "UNDER REVIEW"}
              completed={status === "VERIFIED"}
            />

            <div className="flow-line" />

            <FlowStep
              number="04"
              title="Verified"
              active={status === "VERIFIED"}
              completed={false}
            />
          </div>

          <div className="alternate-statuses">
            <span>Possible review outcomes:</span>
            <strong>CHANGES REQUIRED</strong>
            <strong>REJECTED</strong>
          </div>
        </section>

        {/* ACTION AREA */}
        <div className="verification-actions">
          <div className="security-note">
            <ShieldCheck size={18} />

            <span>
              Verification decisions and permissions are controlled by the
              Arianiqs backend and Admin review.
            </span>
          </div>

          {!isSubmitted ? (
            <button type="submit" className="submit-verification">
              <ShieldCheck size={18} />
              Submit Verification
            </button>
          ) : (
            <div className="pending-button">
              <Clock3 size={18} />
              Verification Pending
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

/* =========================
   FORM FIELD
========================= */

const FormField = ({
  label,
  required = false,
  type = "text",
  name,
  value,
  onChange,
  disabled = false,
  placeholder = "",
  fullWidth = false,
}) => {
  return (
    <div className={`form-group ${fullWidth ? "full-width" : ""}`}>
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

/* =========================
   DOCUMENT UPLOAD
========================= */

const DocumentUpload = ({
  label,
  documentName,
  file,
  onChange,
  disabled,
}) => {
  return (
    <div className="document-upload">
      <div className="document-info">
        <div className="document-title-row">
          <FileCheck2 size={17} />
          <strong>{label}</strong>
        </div>

        <span>
          {file ? file.name : "No document selected"}
        </span>
      </div>

      <label
        className={`upload-button ${
          disabled ? "upload-disabled" : ""
        }`}
      >
        <Upload size={16} />

        {file ? "Replace" : "Upload"}

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          disabled={disabled}
          onChange={(event) => onChange(event, documentName)}
        />
      </label>
    </div>
  );
};

/* =========================
   FLOW STEP
========================= */

const FlowStep = ({
  number,
  title,
  active,
  completed,
}) => {
  return (
    <div
      className={`flow-step ${
        active ? "active" : ""
      } ${completed ? "completed" : ""}`}
    >
      <div className="flow-number">
        {completed ? <CheckCircle2 size={17} /> : number}
      </div>

      <span>{title}</span>
    </div>
  );
};

export default Verification;