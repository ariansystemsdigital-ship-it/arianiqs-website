import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Plus,
  BadgeDollarSign,
  MessageSquareQuote,
  ShoppingBag,
  FileText,
  ShieldCheck,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="vendor-sidebar">
      {/* BRAND */}
      <div className="sidebar-brand">
        <div className="brand-mark">AQ</div>

        <div className="brand-content">
          <div className="brand-name">ARIANIQS</div>
          <div className="brand-label">VENDOR OS</div>
        </div>
      </div>

      {/* VENDOR SELECTOR */}
      <div className="vendor-selector">
        <div className="vendor-avatar">AS</div>

        <div className="vendor-selector-info">
          <strong>Arian Systems</strong>
          <span>Verified Vendor</span>
        </div>

        <ChevronDown size={16} />
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        {/* WORKSPACE */}
        <div className="nav-section">
          <div className="nav-section-title">
            WORKSPACE
          </div>

          <a href="/dashboard" className="nav-item active">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </a>

          <a href="/rfqs" className="nav-item">
            <MessageSquareQuote size={18} />
            <span>RFQs</span>
            <span className="nav-count">8</span>
          </a>

          <a href="/quotes" className="nav-item">
            <BadgeDollarSign size={18} />
            <span>Quotes</span>
          </a>

          <a href="/orders" className="nav-item">
            <ShoppingBag size={18} />
            <span>Orders</span>
            <span className="nav-count">3</span>
          </a>
        </div>

        {/* CATALOG */}
        <div className="nav-section">
          <div className="nav-section-title">
            CATALOG
          </div>

          <a href="/products" className="nav-item">
            <Package size={18} />
            <span>My Products</span>
          </a>

          <a href="/products/add" className="nav-item">
            <Plus size={18} />
            <span>Add Product</span>
          </a>

          {/* VENDOR OFFERS */}
          <Link to="/vendor-offers" className="nav-item">
            <BadgeDollarSign size={18} />
            <span>Vendor Offers</span>
          </Link>

          <a href="/documents" className="nav-item">
            <FileText size={18} />
            <span>Documents</span>
          </a>
        </div>

        {/* COMPLIANCE */}
        <div className="nav-section">
          <div className="nav-section-title">
            COMPLIANCE
          </div>

          <a href="/verification" className="nav-item">
            <ShieldCheck size={18} />
            <span>Verification</span>
            <span className="status-dot"></span>
          </a>

          <a href="/subscription" className="nav-item">
            <CreditCard size={18} />
            <span>Subscription</span>
          </a>
        </div>

        {/* SYSTEM */}
        <div className="nav-section">
          <div className="nav-section-title">
            SYSTEM
          </div>

          <a href="/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </a>

          <a href="/help" className="nav-item">
            <HelpCircle size={18} />
            <span>Help Center</span>
          </a>
        </div>
      </nav>

      {/* CUSTOMER MARKETPLACE */}
      <div className="sidebar-marketplace">
        <div className="marketplace-info">
          <span>Customer Marketplace</span>
          <small>arianiqs.com</small>
        </div>

        <ExternalLink size={15} />
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="security-status">
          <span className="security-indicator"></span>
          Secure Vendor Environment
        </div>

        <div className="portal-version">
          Vendor OS <strong>v1.0</strong>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;