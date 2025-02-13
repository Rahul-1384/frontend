import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ChatProvider } from './context/ChatContext';
import Loading from "./components/Loading";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import { publicRoutes, adminRoutes } from "./routes/routes";

const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? children : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ChatProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<PublicLayout>{route.element}</PublicLayout>} />
              ))}

              {/* Admin Routes */}
              {adminRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<ProtectedRoute><AdminLayout>{route.element}</AdminLayout></ProtectedRoute>} />
              ))}
            </Routes>
          </Suspense>
        </ChatProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
