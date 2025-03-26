import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ChatProvider } from './context/ChatContext';
import Loading from "./components/Loading";
import PublicLayout from "./components/layout/PublicLayout";
import { publicRoutes, adminRoutes } from "./routes/routes";
import { ThemeProvider } from "./context/ThemeContext";
import { AddressProvider } from './context/AddressContext'; // Import AddressProvider


function App() {
  return (
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          <ChatProvider>
            <ThemeProvider>
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Public Routes */}
                  {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={<PublicLayout>{route.element}</PublicLayout>} />
                  ))}

                </Routes>
              </Suspense>
            </ThemeProvider>
          </ChatProvider>
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  );
}

export default App;
