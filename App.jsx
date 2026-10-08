import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import VendorOffers from "./pages/VendorOffers";

import ProductIdentity from "./pages/ProductIdentity";
import ProductMatchResult from "./pages/ProductMatchResult";
import BasicProductInformation from "./pages/BasicProductInformation";
import ProductFeatures from "./pages/ProductFeatures";
import TechnicalSpecifications from "./pages/TechnicalSpecifications";
import ProductImages from "./pages/ProductImages";
import ProductDocuments from "./pages/ProductDocuments";
import ProductSearchFilter from "./pages/ProductSearchFilter";
import VendorCommercialOffer from "./pages/VendorCommercialOffer";
import ProductReview from "./pages/ProductReview";
import ProductSubmit from "./pages/ProductSubmit";
import ProductStatus from "./pages/ProductStatus";
import MyProducts from "./pages/MyProducts";
import AddVendorOffer from "./pages/AddVendorOffer";
import VendorRegister from "./pages/VendorRegister";
import VendorLogin from "./pages/VendorLogin";
import Subscription from "./pages/Subscription";
import Verification from "./pages/Verification";
import RFQs from "./pages/RFQs";
import RFQDetails from "./pages/RFQDetails";
import SubmitQuote from "./pages/SubmitQuote";
import Quotes from "./pages/Quotes";
import VendorOfferDetails from "./pages/VendorOfferDetails";



function App() {
  return (
    <div className="vendor-app">
      <Sidebar />

      <div className="vendor-main">
        <Topbar />

        <main className="vendor-content">
          <Routes>

            {/* =================================================
                AUTHENTICATION
               ================================================= */}

            <Route
              path="/register"
              element={<VendorRegister />}
            />

            <Route
              path="/login"
              element={<VendorLogin />}
            />

            {/* =================================================
                DASHBOARD
               ================================================= */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* =================================================
                MY PRODUCTS
               ================================================= */}

            <Route
              path="/products"
              element={<MyProducts />}
            />

            {/* =================================================
                VENDOR OFFERS
               ================================================= */}

            <Route
              path="/vendor-offers"
              element={<VendorOffers />}
            />
           
            
            <Route
              path="/vendor-offers/add"
               element={<AddVendorOffer />}
             />
             <Route
                 path="/vendor-offers/:offerCode"
                    element={<VendorOfferDetails />}
              />
             <Route path="/subscription" element={<Subscription />} />
             <Route path="/verification" element={<Verification />} />
             <Route path="/rfqs" element={<RFQs />} />
             <Route path="/rfqs/:rfqId" element={<RFQDetails />} />
             <Route
                    path="/rfqs/:rfqId/quote"
                    element={<SubmitQuote />}
              />
               <Route path="/quotes" element={<Quotes />} />
            {/* =================================================
                PRODUCT ADD WORKFLOW
               ================================================= */}

            <Route
              path="/products/add"
              element={<ProductIdentity />}
            />

            <Route
              path="/products/match"
              element={<ProductMatchResult />}
            />

            <Route
              path="/products/basic-information"
              element={<BasicProductInformation />}
            />

            <Route
              path="/products/features"
              element={<ProductFeatures />}
            />

            <Route
              path="/products/technical-specifications"
              element={<TechnicalSpecifications />}
            />

            <Route
              path="/products/images"
              element={<ProductImages />}
            />

            <Route
              path="/products/documents"
              element={<ProductDocuments />}
            />

            <Route
              path="/products/search-filter"
              element={<ProductSearchFilter />}
            />

            {/* IMPORTANT:
                This route belongs to the existing
                V-01 to V-11 product workflow.
            */}

            <Route
              path="/products/offer"
              element={<VendorCommercialOffer />}
            />

            <Route
              path="/products/review"
              element={<ProductReview />}
            />

            <Route
              path="/products/submit"
              element={<ProductSubmit />}
            />

            <Route
              path="/products/status"
              element={<ProductStatus />}
            />

            {/* =================================================
                LEGACY / DIRECT PRODUCT ROUTES
               ================================================= */}

            <Route
              path="/product-identity"
              element={<ProductIdentity />}
            />

            <Route
              path="/product-match-result"
              element={<ProductMatchResult />}
            />

            {/* =================================================
                DEFAULT
               ================================================= */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;