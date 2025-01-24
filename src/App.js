import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Loading from "./components/Loading";
import Sidebar from "./components/common/Sidebar";
import { Buy } from "./Pages/Buy";
import Cart from "./Pages/CartPage";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import BookDetail from "./Pages/BookDetail";
import SearchResults from "./Pages/SearchResults";

// Lazy-load pages
const Homepage = lazy(() => import("./Pages/Homepage"));
const Sell = lazy(() => import("./Pages/Sell"));
const AuthenticationUser = lazy(() => import("./Pages/AuthenticationUser"));
const AdminLogin = lazy(() => import("./Pages/AdminLogin"));
const OverviewPage = lazy(() => import("./Pages/OverviewPage"));
const BooksPage = lazy(() => import("./Pages/BooksPage"));
const UsersPage = lazy(() => import("./Pages/UsersPage"));
const SalesPage = lazy(() => import("./Pages/SalesPage"));
const OrdersPage = lazy(() => import("./Pages/OrdersPage"));
const AnalyticsPage = lazy(() => import("./Pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("./Pages/SettingsPage"));

const PublicLayout = ({ children }) => <div>{children}</div>;

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-900 text-gray-100 overflow-auto">
    <Sidebar />
    <div className="flex-1">{children}</div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? children : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap your application with CartProvider */}
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={<PublicLayout><Homepage /></PublicLayout>}
            />
            <Route
              path="/sell"
              element={<PublicLayout><Sell /></PublicLayout>}
            />
            <Route
              path="/login"
              element={<PublicLayout><AuthenticationUser /></PublicLayout>}
            />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/products" element={<Buy />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/books/:id/:title/:author/:category/:condition" element={<BookDetail />} />
            <Route path="/search-results" element={<SearchResults />} />

            {/* Admin Routes */}
            <Route
              path="/xynfnsejfdf23jfdcmzqotpwcicdhesf01/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout><OverviewPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ei9kfnsejfdf23jfdmr4wkfscqdwcicdhesf02/admin/books"
              element={
                <ProtectedRoute>
                  <AdminLayout><BooksPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/xymfksnfnsejfdf23jfdcmzqotfmflsdoem2cdhesf03/admin/users"
              element={
                <ProtectedRoute>
                  <AdminLayout><UsersPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/xynfnsejfdf23jffkfslirmdpwcicdhesf04/admin/sales"
              element={
                <ProtectedRoute>
                  <AdminLayout><SalesPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/fksdfoemkcsdejfdf23jfdcmzqotpwcicdhesf05/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminLayout><OrdersPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/xynfnsk0off23jfdcfdsqotfkpicdhesf06/admin/analytics"
              element={
                <ProtectedRoute>
                  <AdminLayout><AnalyticsPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/qqoxkedejgndcf23jfdcmzqiendlsonf07/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout><SettingsPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
