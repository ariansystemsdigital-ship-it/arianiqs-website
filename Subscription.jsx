import React, { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  CreditCard,
  Database,
  FileText,
  Package,
  RefreshCw,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import "./Subscription.css";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For vendors beginning their ArianIQS operations.",
    price: "₹2,999",
    period: "/ month",
    popular: false,
    features: [
      "Up to 25 products",
      "Up to 50 vendor offers",
      "RFQ access",
      "Basic analytics",
      "Standard support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "For vendors managing an active industrial catalog.",
    price: "₹6,999",
    period: "/ month",
    popular: true,
    features: [
      "Up to 100 products",
      "Up to 250 vendor offers",
      "RFQ access",
      "Advanced analytics",
      "Bulk upload",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For vendors with larger catalog and operational needs.",
    price: "Custom",
    period: "",
    popular: false,
    features: [
      "Configurable product limits",
      "Configurable offer limits",
      "RFQ access",
      "Advanced analytics",
      "Bulk upload",
      "API access",
      "Featured product eligibility",
      "Dedicated support",
    ],
  },
];

const currentPlan = {
  name: "Professional",
  status: "ACTIVE",
  started: "01 Oct 2026",
  renewal: "01 Nov 2026",
  productLimit: 100,
  productsUsed: 42,
  offerLimit: 250,
  offersUsed: 86,
  rfqAccess: true,
  bulkUpload: true,
  analytics: true,
  apiAccess: false,
  featuredProducts: true,
};

function Subscription() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showPlans, setShowPlans] = useState(false);

  const productPercentage = useMemo(
    () => Math.round((currentPlan.productsUsed / currentPlan.productLimit) * 100),
    []
  );

  const offerPercentage = useMemo(
    () => Math.round((currentPlan.offersUsed / currentPlan.offerLimit) * 100),
    []
  );

  const handleRenew = () => {
    alert(
      "Renewal request recorded. Payment and subscription processing will be connected to the backend later."
    );
  };

  const handlePlanSelect = (planName) => {
    alert(
      `${planName} plan selected. Plan change processing will be connected to the backend later.`
    );
  };

  return (
    <div className="subscription-page">
      <div className="subscription-header">
        <div>
          <div className="subscription-eyebrow">
            <CreditCard size={15} />
            VENDOR SUBSCRIPTION
          </div>

          <h1>Subscription</h1>

          <p>
            Manage your vendor subscription, plan eligibility and available
            platform capabilities.
          </p>
        </div>

        <button className="renew-button" onClick={handleRenew}>
          <RefreshCw size={17} />
          Renew Subscription
        </button>
      </div>

      <section className="current-plan-card">
        <div className="current-plan-top">
          <div className="plan-title-area">
            <div className="plan-icon">
              <Zap size={21} />
            </div>

            <div>
              <span className="section-label">CURRENT PLAN</span>
              <h2>{currentPlan.name}</h2>
            </div>
          </div>

          <div className="subscription-status">
            <span className="status-dot"></span>
            {currentPlan.status}
          </div>
        </div>

        <div className="current-plan-details">
          <div>
            <span>Started</span>
            <strong>{currentPlan.started}</strong>
          </div>

          <div>
            <span>Next renewal</span>
            <strong>{currentPlan.renewal}</strong>
          </div>

          <div>
            <span>Billing</span>
            <strong>Monthly</strong>
          </div>

          <div>
            <span>Vendor</span>
            <strong>Arian Systems</strong>
          </div>
        </div>
      </section>

      <section className="usage-section">
        <div className="section-heading">
          <div>
            <span className="section-label">PLAN USAGE</span>
            <h2>Resource Usage</h2>
          </div>

          <span className="usage-note">
            Current subscription limits
          </span>
        </div>

        <div className="usage-grid">
          <div className="usage-card">
            <div className="usage-card-header">
              <div className="usage-card-title">
                <div className="usage-icon">
                  <Package size={18} />
                </div>
                <div>
                  <strong>Products</strong>
                  <span>Product catalog limit</span>
                </div>
              </div>

              <strong>
                {currentPlan.productsUsed} / {currentPlan.productLimit}
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${productPercentage}%` }}
              ></div>
            </div>

            <div className="usage-footer">
              <span>{productPercentage}% used</span>
              <span>
                {currentPlan.productLimit - currentPlan.productsUsed} remaining
              </span>
            </div>
          </div>

          <div className="usage-card">
            <div className="usage-card-header">
              <div className="usage-card-title">
                <div className="usage-icon">
                  <FileText size={18} />
                </div>
                <div>
                  <strong>Vendor Offers</strong>
                  <span>Offer limit</span>
                </div>
              </div>

              <strong>
                {currentPlan.offersUsed} / {currentPlan.offerLimit}
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${offerPercentage}%` }}
              ></div>
            </div>

            <div className="usage-footer">
              <span>{offerPercentage}% used</span>
              <span>
                {currentPlan.offerLimit - currentPlan.offersUsed} remaining
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <div>
            <span className="section-label">PLAN FEATURES</span>
            <h2>Available Capabilities</h2>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Package size={19} />
            </div>

            <div>
              <strong>Product Management</strong>
              <span>
                Product limit: {currentPlan.productLimit}
              </span>
            </div>

            <Check size={18} className="feature-check" />
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FileText size={19} />
            </div>

            <div>
              <strong>Vendor Offers</strong>
              <span>
                Offer limit: {currentPlan.offerLimit}
              </span>
            </div>

            <Check size={18} className="feature-check" />
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Database size={19} />
            </div>

            <div>
              <strong>Bulk Upload</strong>
              <span>
                Upload capability available
              </span>
            </div>

            {currentPlan.bulkUpload ? (
              <Check size={18} className="feature-check" />
            ) : (
              <span className="feature-disabled">Unavailable</span>
            )}
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FileText size={19} />
            </div>

            <div>
              <strong>RFQ Access</strong>
              <span>
                Eligible RFQs available to vendor
              </span>
            </div>

            {currentPlan.rfqAccess ? (
              <Check size={18} className="feature-check" />
            ) : (
              <span className="feature-disabled">Unavailable</span>
            )}
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Database size={19} />
            </div>

            <div>
              <strong>Analytics</strong>
              <span>
                Vendor performance analytics
              </span>
            </div>

            {currentPlan.analytics ? (
              <Check size={18} className="feature-check" />
            ) : (
              <span className="feature-disabled">Unavailable</span>
            )}
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <strong>API Access</strong>
              <span>
                Programmatic platform access
              </span>
            </div>

            {currentPlan.apiAccess ? (
              <Check size={18} className="feature-check" />
            ) : (
              <span className="feature-disabled">Unavailable</span>
            )}
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Star size={19} />
            </div>

            <div>
              <strong>Featured Products</strong>
              <span>
                Featured product eligibility
              </span>
            </div>

            {currentPlan.featuredProducts ? (
              <Check size={18} className="feature-check" />
            ) : (
              <span className="feature-disabled">Unavailable</span>
            )}
          </div>
        </div>
      </section>

      <section className="plans-section">
        <div className="plans-header">
          <div>
            <span className="section-label">SUBSCRIPTION PLANS</span>
            <h2>Available Plans</h2>
            <p>
              Review available subscription configurations for your vendor
              account.
            </p>
          </div>

          <div className="billing-toggle">
            <button
              className={billingCycle === "monthly" ? "active" : ""}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>

            <button
              className={billingCycle === "annual" ? "active" : ""}
              onClick={() => setBillingCycle("annual")}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              className={`plan-card ${
                plan.popular ? "popular-plan" : ""
              }`}
              key={plan.id}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Star size={13} />
                  RECOMMENDED
                </div>
              )}

              <div className="plan-card-content">
                <h3>{plan.name}</h3>

                <p className="plan-description">
                  {plan.description}
                </p>

                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </div>

                <div className="plan-feature-list">
                  {plan.features.map((feature) => (
                    <div className="plan-feature" key={feature}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={
                    plan.name === currentPlan.name
                      ? "current-plan-button"
                      : "select-plan-button"
                  }
                  disabled={plan.name === currentPlan.name}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {plan.name === currentPlan.name
                    ? "Current Plan"
                    : "Select Plan"}

                  {plan.name !== currentPlan.name && (
                    <ChevronRight size={17} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="subscription-note">
        <ShieldCheck size={20} />

        <div>
          <strong>Subscription eligibility</strong>
          <p>
            Subscription status and plan eligibility are enforced by the
            backend. Frontend status indicators are for vendor visibility and
            navigation only.
          </p>
        </div>
      </section>

      <div className="mobile-plan-toggle">
        <button onClick={() => setShowPlans(!showPlans)}>
          {showPlans ? "Hide plan details" : "View plan details"}
        </button>
      </div>
    </div>
  );
}

export default Subscription;