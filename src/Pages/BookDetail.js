import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BooksNavbar from "../components/BooksNavbar";
import { FaShoppingCart, FaHeart, FaShareAlt, FaCreditCard } from "react-icons/fa"; // Added Heart and Share icons
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation  } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`);
        if (response.status === 404) throw new Error("Book not found");
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setBook(null);
      }
    };
    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    // Fetch wishlist status when book data is available
    const fetchWishlistStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/wishlist`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (response.ok) {
          const wishlist = await response.json();
          const isBookInWishlist = wishlist.some((item) => item.bookId === book?.id);
          setIsWishlist(isBookInWishlist);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };
    if (book) fetchWishlistStatus();
  }, [book]);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Failed to load book details. Please try again later.</p>
      </div>
    );
  }


  const details = [
    { label: "Net Quantity (N)", value: "Single" },
    { label: "No. of Pages", value: 559 },
    { label: "Edition", value: "2024 Latest Edition" },
    { label: "Publisher", value: "S.Chand" },
    { label: "Publication Year", value: 2022 },
    { label: "Binding", value: "Paperback" },
    { label: "Language", value: book.language },
    { label: "Packer Information", value: "No information available" },
  ];

  const discountedPrice = (
    Math.max(0, (book?.price || 0) - (book?.discount || 0))
  ).toFixed(2);

  const handleWishlistToggle = async () => {
    const url = isWishlist
      ? `${API_BASE_URL}/wishlist/${book.id}`
      : `${API_BASE_URL}/wishlist`;

    const method = isWishlist ? "DELETE" : "POST";
    const body = !isWishlist ? JSON.stringify({ bookId: book.id }) : undefined;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Use the token for authentication
        },
        body: body,
      });

      if (response.ok) {
        setIsWishlist(!isWishlist); // Toggle the state
      } else {
        console.error("Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title || "Book Details",
          text: `Check out this book: ${book?.title}\n\n${book?.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing book details:", err);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  const handleAddToCart = async () => {
    if (!book) return;
  
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          bookId: book.id,
          quantity: 1, // Add 1 for each click, but you can modify to allow for multiple increments
        }),
      });
  
      if (response.ok) {
        const updatedItem = await response.json();
        setIsInCart(true); // Update cart status
  
        // If item is added to cart or quantity is increased, update the button to show updated status
        console.log('Book added to cart or quantity updated:', updatedItem);
      } else {
        console.error('Failed to add book to cart');
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };
  
  
  

  return (
    <div className="book-detail">
      <BooksNavbar />
      <div className="bg-gray-700 flex flex-col md:flex-row">
        {/* <p className="text-center">Get into the world of Manga.</p> */}
        <div className="bg-white shadow-lg p-2 w-[100%] mx-auto flex flex-col gap-4">
        <div className="relative max-w-lg w-full mx-auto">
      {/* Swiper Component */}
      <Swiper
        className="bg-black"
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
      >
        {book.image && book.image.length > 0 ? (
          book.image.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={imgUrl}
                  alt={`Book Img ${index + 1}`}
                  className="rounded-lg w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="relative">
              <img
                src="https://via.placeholder.com/600x400?text=No+Image"
                alt="No Img"
                className="rounded-lg w-full object-fill"
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Navigation Buttons (Visible Only on Large Screens) */}
      <button className="custom-swiper-button-prev hidden lg:flex absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10">
        ❮
      </button>
      <button className="custom-swiper-button-next hidden lg:flex absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10">
        ❯
      </button>
    </div>
          {/* Similar Books Based on conditions */}
          <div>
            <p className="text-lg font-bold">Book Condition</p>
            <div className="flex gap-2">
              <img
                src={book.image}
                alt="Similar Books"
                className="w-[15%] h-20 rounded-md bg-black object-cover"
              />
              <img
                src={book.image}
                alt="Similar Books"
                className="w-[15%] h-20 rounded-md bg-black object-cover"
              />
              <img
                src={book.image}
                alt="Similar Books"
                className="w-[15%] h-20 rounded-md bg-black object-cover"
              />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div>
          {/* Price details */}
          <div className="mt-2 p-2 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold mb-2">{book.title}</p>
              {/* Wishlist and Share */}
              <div className="flex gap-4">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex flex-col items-center text-base ${isWishlist ? "text-red-500" : "text-gray-500"}`}
                >
                  <FaHeart className="cursor-pointer" />
                  <span className="text-base">Wishlist</span>
                </button>
                <button onClick={handleShare} className="flex flex-col items-center text-base text-gray-500">
                  <FaShareAlt className="cursor-pointer" />
                  <span className="text-base">Share</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl font-bold text-green-600">${discountedPrice}</span>
              <span className="line-through text-gray-500 text-sm">${book.price}</span>
              <span className="text-sm font-medium text-green-600">({book.discount}% Off)</span>
            </div>
            <p className="text-slate-500 text-base -mt-3">Free Delivery</p>
          </div>


          {/* Product Details */}
          <div className="mt-2 p-2 bg-white text-gray-500 shadow-2xl flex flex-col">
            <p className="text-xl text-black font-bold">Item's Details</p>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-bold mb-0">Name: {book.title.toUpperCase()}</p>
                <p className="font-bold mb-0">Board: {book.board}</p>
                <p className="font-bold mb-0">Author: {book.author}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold mb-0">ISBN: {book.ISBN}</p>
                <p className="font-bold mb-0">Type: {book.type}</p>
                <p className={`font-bold text-white rounded-2xl text-center px-1 py-1 ${book.condition === "New" ? "bg-green-500" : book.condition === "Good" ? "bg-yellow-500" : "bg-yellow-500"}`}>Condition: {book.condition}</p>
              </div>
            </div>
            <div className="border-b pb-2" onClick={() => setIsOpen(!isOpen)}>
              <div className="flex justify-between items-center cursor-pointer">
                <span className="font-bold text-gray-800">Additional Details</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {isOpen && (
                <div className="mt-2 text-gray-800 text-sm">
                  <div className="grid grid-cols-2 gap-y-1">
                    {details.map((item, index) => (
                      <React.Fragment key={index}>
                        <span className="text-gray-800 font-semibold">{item.label}: </span>
                        <span className="text-gray-600 font-medium">{item.value}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buy now and Cart buttons */}
        <div className="flex border-2 justify-around p-3 fixed-bottom bg-[#001E29] ">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 ${isInCart ? "bg-gray-400 cursor-not-allowed" : ""}`}
            disabled={isInCart} // Disable the button after the item is added
          >
            <FaShoppingCart className="mr-2" />
            {isInCart ? `Added to Cart (Qty: ${book.quantity})` : 'Add to Cart'}
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
            <FaCreditCard className="mr-2" /> Buy Now
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default BookDetail;