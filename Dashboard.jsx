import {
  ArrowUpRight,
  ArrowRight,
  Package,
  Clock3,
  ShoppingCart,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  MoreHorizontal,
  FileText,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* PAGE HEADER */}
      <section className="dashboard-header">
        <div>
          <div className="eyebrow">
            VENDOR CONTROL CENTER
          </div>

          <h1>Good morning, Arian Systems</h1>

          <p>
            Manage your industrial catalog, offers, RFQs and orders
            from one workspace.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button className="secondary-button">
            View Marketplace
            <ArrowUpRight size={16} />
          </button>

          <button className="primary-button">
            <Package size={17} />
            Add Product
          </button>
        </div>
      </section>

      {/* STATUS STRIP */}
      <section className="vendor-status-strip">

        <div className="status-main">
          <div className="status-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <strong>Vendor account verified</strong>
            <span>
              Your company is approved to operate on ArianIQS.
            </span>
          </div>
        </div>

        <div className="status-items">

          <div className="status-item">
            <span>Subscription</span>
            <strong className="status-active">
              ACTIVE
            </strong>
          </div>

          <div className="status-item">
            <span>Marketplace</span>
            <strong className="status-active">
              ELIGIBLE
            </strong>
          </div>

          <div className="status-item">
            <span>Profile</span>
            <strong>92%</strong>
          </div>

        </div>
      </section>

      {/* METRICS */}
      <section className="metrics-grid">

        <MetricCard
          label="Active Products"
          value="128"
          change="+12"
          description="vs last month"
          icon={<Package size={20} />}
        />

        <MetricCard
          label="Open RFQs"
          value="8"
          change="+3"
          description="new this week"
          icon={<Clock3 size={20} />}
        />

        <MetricCard
          label="Active Orders"
          value="24"
          change="+6"
          description="vs last month"
          icon={<ShoppingCart size={20} />}
        />

        <MetricCard
          label="30-Day GMV"
          value="₹18.42L"
          change="+14.8%"
          description="vs previous 30 days"
          icon={<IndianRupee size={20} />}
        />

      </section>

      {/* MAIN GRID */}
      <section className="dashboard-grid">

        {/* PRODUCT ACTIVITY */}
        <div className="dashboard-panel product-activity">

          <PanelHeader
            title="Product Activity"
            subtitle="Catalog performance"
            action="View products"
          />

          <div className="activity-summary">

            <div className="activity-stat">
              <span>Total products</span>
              <strong>164</strong>
            </div>

            <div className="activity-stat">
              <span>Published</span>
              <strong className="text-success">
                128
              </strong>
            </div>

            <div className="activity-stat">
              <span>Under review</span>
              <strong className="text-warning">
                14
              </strong>
            </div>

            <div className="activity-stat">
              <span>Drafts</span>
              <strong>22</strong>
            </div>

          </div>

          <div className="progress-section">

            <div className="progress-label">
              <span>Marketplace readiness</span>
              <strong>78%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-value"
                style={{ width: "78%" }}
              ></div>
            </div>

          </div>

          <div className="mini-table">

            <div className="mini-table-row mini-table-head">
              <span>Product</span>
              <span>Status</span>
              <span>Updated</span>
            </div>

            <div className="mini-table-row">
              <span>
                Siemens S7-1200 CPU 1214C
              </span>

              <span className="table-status published">
                Published
              </span>

              <span>12 min ago</span>
            </div>

            <div className="mini-table-row">
              <span>
                ABB ACS355 Drive
              </span>

              <span className="table-status review">
                Under review
              </span>

              <span>1 hr ago</span>
            </div>

            <div className="mini-table-row">
              <span>
                Schneider Modicon M221
              </span>

              <span className="table-status published">
                Published
              </span>

              <span>3 hrs ago</span>
            </div>

          </div>
        </div>

        {/* REVIEW QUEUE */}
        <div className="dashboard-panel review-panel">

          <PanelHeader
            title="Review Queue"
            subtitle="Items requiring attention"
            action="View all"
          />

          <div className="review-list">

            <ReviewItem
              icon={<AlertTriangle size={18} />}
              title="Product changes required"
              description="4 products need updates"
              count="04"
              type="warning"
            />

            <ReviewItem
              icon={<Clock3 size={18} />}
              title="Awaiting review"
              description="7 products submitted"
              count="07"
              type="pending"
            />

            <ReviewItem
              icon={<FileCheckIcon />}
              title="Documents expiring"
              description="2 documents need renewal"
              count="02"
              type="danger"
            />

          </div>

          <button className="panel-link">
            Open review center
            <ArrowRight size={16} />
          </button>

        </div>

      </section>

      {/* LOWER GRID */}
      <section className="dashboard-grid lower-grid">

        {/* ORDERS */}
        <div className="dashboard-panel">

          <PanelHeader
            title="Recent Orders"
            subtitle="Latest marketplace activity"
            action="View orders"
          />

          <div className="orders-table">

            <div className="orders-row orders-head">
              <span>Order</span>
              <span>Customer</span>
              <span>Value</span>
              <span>Status</span>
            </div>

            <OrderRow
              order="ARQ-ORD-10482"
              customer="Vertex Automation"
              value="₹2,84,500"
              status="Processing"
            />

            <OrderRow
              order="ARQ-ORD-10479"
              customer="Mechtron Controls"
              value="₹1,42,800"
              status="Confirmed"
            />

            <OrderRow
              order="ARQ-ORD-10471"
              customer="Nova Industrial"
              value="₹86,250"
              status="Shipped"
            />

            <OrderRow
              order="ARQ-ORD-10466"
              customer="Prime Automation"
              value="₹64,900"
              status="Delivered"
            />

          </div>
        </div>

        {/* OFFER PERFORMANCE */}
        <div className="dashboard-panel offer-performance">

          <PanelHeader
            title="Offer Performance"
            subtitle="Last 30 days"
            action="Analytics"
          />

          <div className="performance-number">
            <strong>₹18.42L</strong>

            <span className="positive-change">
              +14.8%
            </span>
          </div>

          <div className="performance-chart">

            <div className="chart-bars">
              <span style={{ height: "32%" }}></span>
              <span style={{ height: "46%" }}></span>
              <span style={{ height: "39%" }}></span>
              <span style={{ height: "61%" }}></span>
              <span style={{ height: "53%" }}></span>
              <span style={{ height: "72%" }}></span>
              <span style={{ height: "66%" }}></span>
              <span style={{ height: "84%" }}></span>
              <span style={{ height: "76%" }}></span>
              <span style={{ height: "94%" }}></span>
              <span style={{ height: "87%" }}></span>
              <span style={{ height: "100%" }}></span>
            </div>

          </div>

          <div className="performance-footer">

            <div>
              <span>Quotes sent</span>
              <strong>86</strong>
            </div>

            <div>
              <span>Conversion</span>
              <strong>18.6%</strong>
            </div>

            <div>
              <span>Avg. order</span>
              <strong>₹76.8K</strong>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   METRIC CARD
===================================================== */

function MetricCard({
  label,
  value,
  change,
  description,
  icon,
}) {
  return (
    <div className="metric-card">

      <div className="metric-top">
        <div className="metric-icon">
          {icon}
        </div>

        <MoreHorizontal size={18} />
      </div>

      <div className="metric-label">
        {label}
      </div>

      <div className="metric-value">
        {value}
      </div>

      <div className="metric-bottom">
        <span className="metric-change">
          {change}
        </span>

        <span>{description}</span>
      </div>

    </div>
  );
}


/* =====================================================
   PANEL HEADER
===================================================== */

function PanelHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="panel-header">

      <div>
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <button className="panel-action">
        {action}
        <ArrowRight size={15} />
      </button>

    </div>
  );
}


/* =====================================================
   REVIEW ITEM
===================================================== */

function ReviewItem({
  icon,
  title,
  description,
  count,
  type,
}) {
  return (
    <div className={`review-item ${type}`}>

      <div className="review-icon">
        {icon}
      </div>

      <div className="review-content">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <div className="review-count">
        {count}
      </div>

    </div>
  );
}


/* =====================================================
   DOCUMENT ICON
===================================================== */

function FileCheckIcon() {
  return (
    <FileText
      size={18}
    />
  );
}


/* =====================================================
   ORDER ROW
===================================================== */

function OrderRow({
  order,
  customer,
  value,
  status,
}) {
  return (
    <div className="orders-row">

      <strong>{order}</strong>

      <span>{customer}</span>

      <strong>{value}</strong>

      <span
        className={`order-status ${status
          .toLowerCase()
          .replace(" ", "-")}`}
      >
        {status}
      </span>

    </div>
  );
}

export default Dashboard;