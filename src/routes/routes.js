import { elements } from "chart.js";
import { lazy } from "react";
import MangaReaderApp from "../Pages/MangaReaderApp";

// Lazy-load Pages for better performance
const Homepage = lazy(() => import("../Pages/Homepage"));
const Sell = lazy(() => import("../Pages/Sell"));
const LoginForm = lazy(() => import("../Pages/LoginForm"));
const SignupForm = lazy(() => import("../Pages/SignupForm"));
const VerifyEmail = lazy(() => import("../Pages/VerifyEmail"));
const AdminLogin = lazy(() => import("../Pages/AdminLogin"));
const Buy = lazy(() => import("../Pages/Buy"));
const Cart = lazy(() => import("../Pages/CartPage"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const ContactUs = lazy(() => import("../Pages/ContactUs"));
const BookDetail = lazy(() => import("../Pages/BookDetail"));
const SearchResults = lazy(() => import("../Pages/SearchResults"));
const ForgotPassword = lazy(() => import("../Pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/ResetPassword"));
const Wishlist = lazy(() => import("../Pages/WishList"));
const MyOrders = lazy(() => import("../Pages/MyOrders"));
const TrackOrders = lazy(() => import("../Pages/TrackOrders"));
const Profile = lazy(() => import("../Pages/Profile"));
const Rent = lazy(() => import("../Pages/Rent"));
const Categories = lazy(() => import("../Pages/Categories"));
const CategoryDetails = lazy(() => import("../Pages/CategoryDetails"));
const ChangePassword = lazy(() => import("../Pages/ChangePassword"));
const EBooksSection = lazy(() => import("../Pages/EBooksSection"));
const CheckoutPage = lazy(() => import("../Pages/CheckoutPage"));
const GameDashboard = lazy(() => import("../Pages/GameDashboard"));




// Admin Pages
const OverviewPage = lazy(() => import("../Pages/OverviewPage"));
const BooksPage = lazy(() => import("../Pages/BooksPage"));
const UsersPage = lazy(() => import("../Pages/UsersPage"));
const SalesPage = lazy(() => import("../Pages/SalesPage"));
const OrdersPage = lazy(() => import("../Pages/OrdersPage"));
const AnalyticsPage = lazy(() => import("../Pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("../Pages/SettingsPage"));

// Public Routes
export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  { path: "/sell", element: <Sell /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignupForm /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/products", element: <Buy /> },
  { path: "/cart", element: <Cart /> },
  { path: "/aboutus", element: <AboutUs /> },
  { path: "/contactus", element: <ContactUs /> },
  { path: "/books/:id/:title/:author/:category/:condition", element: <BookDetail /> },
  { path: "/books/:id", element: <BookDetail /> },
  { path: "/search-results", element: <SearchResults /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/rent", element: <Rent /> },
  { path: "/categories", element: <Categories /> },
  { path: "/categories/:categoryId", element: <CategoryDetails /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/ebooks", element: <EBooksSection /> },
  { path: "/orders", element: <MyOrders /> },
  { path: "/track-orders", element: <TrackOrders /> },
  { path: "/profile", element: <Profile /> },
  { path: "/manga", element: <MangaReaderApp /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/game", element: <GameDashboard /> },



];

// Admin Routes
export const adminRoutes = [
  { path: "/admin", element: <OverviewPage /> },
  { path: "/admin/books", element: <BooksPage /> },
  { path: "/admin/users", element: <UsersPage /> },
  { path: "/admin/sales", element: <SalesPage /> },
  { path: "/admin/orders", element: <OrdersPage /> },
  { path: "/admin/analytics", element: <AnalyticsPage /> },
  { path: "/admin/settings", element: <SettingsPage /> },
];
