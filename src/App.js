import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import Sidebar from './components/common/Sidebar';

// Lazy-load public pages
const Homepage = lazy(() => import('./Pages/Homepage'));
const Sell = lazy(() => import('./Pages/Sell'));
const AuthenticationUser = lazy(() => import('./Pages/AuthenticationUser'));

// Lazy-load admin pages
const OverviewPage = lazy(() => import('./Pages/OverviewPage'));
const BooksPage = lazy(() => import('./Pages/BooksPage'));
const UsersPage = lazy(() => import('./Pages/UsersPage'));
const SalesPage = lazy(() => import('./Pages/SalesPage'));
const OrdersPage = lazy(() => import('./Pages/OrdersPage'));
const AnalyticsPage = lazy(() => import('./Pages/AnalyticsPage'));
const SettingsPage = lazy(() => import('./Pages/SettingsPage'));

// Layouts
const PublicLayout = ({ children }) => <div>{children}</div>;

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-900 text-gray-100 overflow-auto">
    {/* Background Gradient */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>

    {/* Sidebar */}
    <Sidebar />
    {/* Content */}
    <div className="flex-1">{children}</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes (without sidebar) */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Homepage />
            </PublicLayout>
          }
        />
        <Route
          path="/sell"
          element={
            <PublicLayout>
              <Sell />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <AuthenticationUser />
            </PublicLayout>
          }
        />

        {/* Admin Routes (with sidebar) */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <OverviewPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/books"
          element={
            <AdminLayout>
              <BooksPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/sales"
          element={
            <AdminLayout>
              <SalesPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <OrdersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminLayout>
              <AnalyticsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <SettingsPage />
            </AdminLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
