import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './CartPage.css';

// Placeholder API functions
const fetchCartItems = async () => {
  // Simulate API call to fetch cart items
  return [
    {
      id: 1,
      name: "asian Mexico-01 Chunky Sneakers, Loafers, Walking...",
      size: "7, White, Grey, Orange, 7",
      seller: "AsianFootwears",
      price: 1499,
      discount: 653,
      quantity: 1,
      deliveryDate: "Thu Jan 30",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM7SOTbegIs-D7Qc8-YYuhlLinXYiA_mkg8w&s",
    },
    {
      id: 2,
      name: "Sneakers, Loafers, Walking...",
      size: "7, White, Grey, Orange, 7",
      seller: "AsianFootwears",
      price: 1499,
      discount: 653,
      quantity: 1,
      deliveryDate: "Thu Jan 30",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM7SOTbegIs-D7Qc8-YYuhlLinXYiA_mkg8w&s",
    },
  ];
};

const updateCartItem = async (id, updatedItem) => {
  // Simulate API call to update cart item quantity
  return { success: true, data: updatedItem };
};

const removeCartItem = async (id) => {
  // Simulate API call to remove an item from the cart
  return { success: true };
};

function CartPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItemToRemove, setCartItemToRemove] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch cart items on load
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price - item.discount) * item.quantity,
      0
    );
  };

  const increaseQuantity = async (id) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      const updatedItem = updatedItems.find((item) => item.id === id);
      await updateCartItem(id, updatedItem);

      setCartItems(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );

      const updatedItem = updatedItems.find((item) => item.id === id);
      await updateCartItem(id, updatedItem);

      setCartItems(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveClick = (id) => {
    setCartItemToRemove(id);
    setIsModalOpen(true);
  };

  const confirmRemove = async () => {
    try {
      await removeCartItem(cartItemToRemove);

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemToRemove)
      );

      setSuccessMessage(
        cartItems.length === 1
          ? "Your cart is empty now!"
          : "Item removed successfully!"
      );
    } catch (error) {
      console.error("Error removing item:", error);
      setSuccessMessage("Failed to remove item.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 3000);
      setIsModalOpen(false);
    }
  };

  const cancelRemove = () => {
    setIsModalOpen(false);
    setSuccessMessage("Item removal cancelled!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gradient-to-r text-black min-h-screen flex flex-col items-center justify-center text-center p-6">
        {/* Icon or Image */}
        <div className="mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYPrEYb7-9t-SSLwC0rCWlk9yW_Yk-tyMvA&s"
            alt="Empty Cart Illustration"
            className="w-full max-w-[300px] rounded-lg"
          />
        </div>
  
        {/* Main Heading */}
        <p className="text-3xl font-semibold  mb-4">
          <span className="text-red-600">Oops</span>! Your cart is empty.
        </p>
  
        {/* Description */}
        <p className="text-xl  opacity-80 mb-6">
          Looks like you haven’t added anything to your cart yet. Start shopping
          now and grab exciting offers!
        </p>
  
        {/* Shop Now Button */}
        <button
          className="button-style bg-orange-500  px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate("/buy")}
        >
          Start Shopping
        </button>
  
        {/* Motivational Quote */}
        <div className="mt-8  opacity-70 text-sm">
          <p>“The best time to shop is now!”</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="book-detail relative px-28 pt-7">
      {/* Delivery Info */}
      <DeliveryInfo />

      {/* Cart and Price Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Section */}
        <div className="flex-1">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              handleRemoveClick={handleRemoveClick}
            />
          ))}
        </div>

        {/* Price Section */}
        <PriceDetails cartItems={cartItems} calculateTotalAmount={calculateTotalAmount} />
      </div>

      {/* Place Order Button */}
      <PlaceOrderButton />

      {/* Footer Info */}
      <FooterInfo />

      {/* Remove Modal */}
      {isModalOpen && (
        <RemoveModal confirmRemove={confirmRemove} cancelRemove={cancelRemove} />
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300">
          {successMessage}
        </div>
      )}
    </div>
  );
}

// Delivery Info Component
function DeliveryInfo() {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">
          Deliver to: <span className="font-semibold">Dhar - 454435</span>
        </span>
        <button className="text-blue-600 font-medium hover:underline">Change</button>
      </div>
    </div>
  );
}

// Cart Item Component
function CartItem({ item, increaseQuantity, decreaseQuantity, handleRemoveClick }) {
  return (
    <div className="flex-1 bg-white p-4 rounded-md shadow-md mb-4">
      <div className="flex gap-4">
        <img src={item.image} alt="Product" className="w-24 h-24 rounded-md object-cover" />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-500">
              Size: {item.size} <br />
              Seller: <span className="text-blue-600 font-medium">{item.seller}</span>
            </p>
          </div>
          <div className="text-green-600 text-sm font-medium">43% Off</div>
          <p className="text-gray-500 text-sm">
            Delivery by {item.deliveryDate} | <span className="font-medium text-green-600">Free</span>
          </p>
        </div>
        <div className="text-right">
          <p className="line-through text-gray-400">₹{item.price}</p>
          <p className="font-semibold text-lg text-gray-800">₹{item.price - item.discount}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            onClick={() => decreaseQuantity(item.id)}
          >
            −
          </button>
          <span className="px-4 py-2 border rounded-md">{item.quantity}</span>
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            onClick={() => increaseQuantity(item.id)}
          >
            +
          </button>
        </div>
        <button
          className="text-red-600 font-medium hover:underline"
          onClick={() => handleRemoveClick(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// Price Details Component
function PriceDetails({ cartItems, calculateTotalAmount }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full lg:w-1/3">
      <h3 className="font-medium text-lg mb-4">PRICE DETAILS</h3>
      <div className="flex justify-between text-sm mb-2">
        <span>Price ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})</span>
        <span>₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>Discount</span>
        <span className="text-green-600">
          − ₹{cartItems.reduce((total, item) => total + item.discount * item.quantity, 0)}
        </span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total Amount</span>
        <span>₹{calculateTotalAmount()}</span>
      </div>
    </div>
  );
}

// Place Order Button Component
function PlaceOrderButton() {
  return (
    <div className="mt-6 flex justify-center">
      <button className="bg-orange-500 text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600">
        PLACE ORDER
      </button>
    </div>
  );
}

function FooterInfo() {
  return (
    <p className="text-center text-gray-500 text-sm mt-4">
      Safe and Secure Payments. Easy returns. 100% Authentic products.
    </p>
  );
}

// Remove Modal Component
function RemoveModal({ confirmRemove, cancelRemove }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800">Are you sure you want to remove this item?</h2>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={confirmRemove}
          >
            Yes, Remove
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={cancelRemove}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;