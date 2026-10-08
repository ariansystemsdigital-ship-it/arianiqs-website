import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

import "./Topbar.css";

function Topbar() {
  return (
    <header className="vendor-topbar">

      {/* LEFT — BREADCRUMB */}
      <div className="topbar-left">

        <div className="breadcrumb">
          <span>Vendor Portal</span>
          <span className="breadcrumb-separator">/</span>
          <strong>Dashboard</strong>
        </div>

      </div>


      {/* CENTER — GLOBAL SEARCH */}
      <div className="global-search">

        <Search
          className="global-search-icon"
          size={19}
        />

        <input
          type="text"
          placeholder="Search products, RFQs, orders, documents..."
          aria-label="Search products, RFQs, orders and documents"
        />

      </div>


      {/* RIGHT — ACTIONS */}
      <div className="topbar-actions">

        {/* HELP */}
        <button
          className="topbar-icon-button"
          title="Help Center"
          aria-label="Help Center"
          type="button"
        >
          <HelpCircle size={19} />
        </button>


        {/* NOTIFICATIONS */}
        <button
          className="topbar-icon-button notification-button"
          title="Notifications"
          aria-label="Notifications"
          type="button"
        >
          <Bell size={19} />

          <span className="notification-dot"></span>
        </button>


        {/* DIVIDER */}
        <div className="topbar-divider"></div>


        {/* VENDOR STATUS */}
        <div className="topbar-verification">

          <div className="verification-icon">
            <ShieldCheck size={17} />
          </div>

          <div className="verification-details">
            <span>Vendor Status</span>
            <strong>VERIFIED</strong>
          </div>

        </div>


        {/* PROFILE */}
        <button
          className="topbar-profile"
          aria-label="Open vendor profile menu"
          type="button"
        >

          <div className="profile-avatar">
            AS
          </div>

          <div className="profile-details">
            <strong>Arian Systems</strong>
            <span>Vendor Admin</span>
          </div>

          <ChevronDown size={16} />

        </button>

      </div>

    </header>
  );
}

export default Topbar;