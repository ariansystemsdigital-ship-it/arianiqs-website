import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import "./VendorRegister.css";

function VendorRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)
    ) {
      newErrors.businessEmail = "Enter a valid business email.";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    /*
      IMPORTANT:
      This is only the frontend registration preparation.

      Production registration will later send this data to the
      ArianIQS backend through HTTPS.

      The backend will:
      - Validate email/mobile uniqueness
      - Create the vendor account shell
      - Create the vendor record
      - Set lifecycle status to REGISTERED
      - Start email/mobile verification
      - Create an audit event

      Do NOT store passwords in localStorage or browser storage.
    */

    console.log("Registration form ready for backend:", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      businessEmail: formData.businessEmail,
      mobileNumber: formData.mobileNumber,
    });

    alert(
      "Registration form is valid. Backend registration will be connected in the authentication phase."
    );
  };

  return (
    <div className="vendor-register-page">
      <header className="register-header">
        <div className="register-brand">
          <div className="register-brand-mark">AQ</div>

          <div>
            <div className="register-brand-name">ARIANIQS</div>
            <div className="register-brand-subtitle">VENDOR OS</div>
          </div>
        </div>

        <div className="secure-label">
          <ShieldCheck size={17} />
          <span>Secure Vendor Environment</span>
        </div>
      </header>

      <main className="register-main">
        <section className="register-card">
          <div className="register-intro">
            <div className="intro-icon">
              <Building2 size={24} />
            </div>

            <div>
              <p className="eyebrow">VENDOR REGISTRATION</p>
              <h1>Create your vendor account</h1>
              <p className="intro-description">
                Register your business account to access the ARIANIQS Vendor
                Portal.
              </p>
            </div>
          </div>

          <div className="registration-notice">
            <ShieldCheck size={18} />
            <div>
              <strong>Account verification required</strong>
              <span>
                Registration does not automatically approve your vendor
                account. Verification and review are required.
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <div className="section-heading">
                <h2>Personal Information</h2>
                <span>Required</span>
              </div>

              <div className="form-grid two-columns">
                <div className="field-group">
                  <label htmlFor="firstName">
                    First Name <span>*</span>
                  </label>

                  <div className="input-wrapper">
                    <User size={18} />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                  </div>

                  {errors.firstName && (
                    <p className="field-error">{errors.firstName}</p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="lastName">
                    Last Name <span>*</span>
                  </label>

                  <div className="input-wrapper">
                    <User size={18} />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </div>

                  {errors.lastName && (
                    <p className="field-error">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-heading">
                <h2>Business Contact</h2>
                <span>Required</span>
              </div>

              <div className="form-grid two-columns">
                <div className="field-group">
                  <label htmlFor="businessEmail">
                    Business Email <span>*</span>
                  </label>

                  <div className="input-wrapper">
                    <Mail size={18} />
                    <input
                      id="businessEmail"
                      name="businessEmail"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>

                  <p className="field-hint">
                    Use your business email address.
                  </p>

                  {errors.businessEmail && (
                    <p className="field-error">{errors.businessEmail}</p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="mobileNumber">
                    Mobile Number <span>*</span>
                  </label>

                  <div className="input-wrapper">
                    <Phone size={18} />
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      inputMode="numeric"
                      maxLength="10"
                      placeholder="10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>

                  <p className="field-hint">
                    Mobile verification will be required.
                  </p>

                  {errors.mobileNumber && (
                    <p className="field-error">{errors.mobileNumber}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-heading">
                <h2>Account Security</h2>
                <span>Required</span>
              </div>

              <div className="form-grid two-columns">
                <div className="field-group">
                  <label htmlFor="password">
                    Password <span>*</span>
                  </label>

                  <div className="input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((previous) => !previous)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="field-hint">
                    Minimum 8 characters.
                  </p>

                  {errors.password && (
                    <p className="field-error">{errors.password}</p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="confirmPassword">
                    Confirm Password <span>*</span>
                  </label>

                  <div className="input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="field-error">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="registration-footer">
              <div className="registration-security">
                <CheckCircle2 size={17} />
                <span>Your account will require verification and review.</span>
              </div>

              <button type="submit" className="register-button">
                Create Vendor Account
                <ArrowRight size={18} />
              </button>
            </div>
          </form>

          <div className="login-link">
            Already have a vendor account?
            <Link to="/login">Sign in</Link>
          </div>
        </section>
      </main>

      <footer className="register-footer">
        <span>ARIANIQS Vendor OS v1.0</span>
        <span>© Arian Systems</span>
      </footer>
    </div>
  );
}

export default VendorRegister;