import { elements } from "chart.js";
import { lazy } from "react";
import MangaReaderApp from "../Pages/MangaReaderApp";
import BookList from "../components/BookList";
import BookUploadForm from "../components/BookUploadForm";
import OrderList from "../components/OrderList";

// Lazy-load Pages for better performance
const Homepage = lazy(() => import("../Pages/Homepage"));
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
const Donate = lazy(() => import("../Pages/Donate"));
const AddressList = lazy(() => import("../components/address/AddressList"));
const AddressForm = lazy(() => import("../components/address/AddressForm"));
const Help = lazy(() => import("../Pages/Help"));



// Public Routes
export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  // { path: "/sell", element: <Sell /> },
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
  { path: "/donate", element: <Donate /> },
  { path: "/addresses", element: <AddressList /> },
  { path: "/address/add", element: <AddressForm /> },
  { path: "/address/edit/:id", element: <AddressForm /> },
  { path: "/BooksListed", element: <BookList /> },
  { path: "/sell", element: <BookUploadForm /> },
  { path: "/my-orders", element: <OrderList /> },
  { path: "/help", element: <Help /> },

];

