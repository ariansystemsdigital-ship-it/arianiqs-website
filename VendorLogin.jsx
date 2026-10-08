import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./VendorLogin.css";

function VendorLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your business email and password.");
      return;
    }

    // Frontend-only login for now.
    // Real authentication will be connected to the secure backend later.
    console.log("Vendor login submitted:", {
      email: formData.email,
    });

    navigate("/dashboard");
  };

  return (
    <div className="vendor-login-page">
      <div className="vendor-login-container">

        {/* BRAND */}
        <div className="vendor-login-brand">
          <div className="vendor-login-brand-mark">AQ</div>

          <div>
            <div className="vendor-login-brand-name">
              ARIANIQS
            </div>

            <div className="vendor-login-brand-label">
              VENDOR PORTAL
            </div>
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="vendor-login-card">

          <div className="vendor-login-header">
            <div className="vendor-login-icon">
              <LockKeyhole size={24} />
            </div>

            <h1>Welcome back</h1>

            <p>
              Sign in to access your ARIANIQS Vendor Portal.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* BUSINESS EMAIL */}
            <div className="vendor-login-field">
              <label htmlFor="email">
                Business Email
                <span>*</span>
              </label>

              <div className="vendor-login-input-wrapper">
                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your business email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="vendor-login-field">
              <div className="vendor-login-label-row">
                <label htmlFor="password">
                  Password
                  <span>*</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="forgot-password-link"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="vendor-login-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="vendor-login-error">
                {error}
              </div>
            )}

            {/* SIGN IN */}
            <button
              type="submit"
              className="vendor-login-button"
            >
              Sign In
            </button>
          </form>

          {/* REGISTER */}
          <div className="vendor-login-register">
            <span>Don't have a vendor account?</span>

            <Link to="/register">
              Create Vendor Account
            </Link>
          </div>

          {/* SECURITY */}
          <div className="vendor-login-security">
            <ShieldCheck size={16} />

            <span>
              Secure Vendor Environment
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="vendor-login-footer">
          Vendor OS <strong>v1.0</strong>
        </div>

      </div>
    </div>
  );
}

export default VendorLogin;