import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Lock,
  Home,
  PhoneCall,
  Mail,
  User,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Truck
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Card } from '../components/ui/Card';

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Form states
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // New Address Form
  const [addressForm, setAddressForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    is_default: false
  });

  // Credit Card Form
  const [cardForm, setCardForm] = useState({
    card_number: '',
    name_on_card: '',
    expiry_month: '',
    expiry_year: '',
    cvv: ''
  });

  // Validation states
  const [addressErrors, setAddressErrors] = useState({});
  const [cardErrors, setCardErrors] = useState({});

  // Get cart data and address data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchCartData(),
          fetchSavedAddresses()
        ]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to load checkout data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const token = localStorage.getItem('authToken');
  const parsedToken = JSON.parse(token);
  const fetchCartData = async () => {
    try {
      if (!parsedToken && !parsedToken.access) {
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/cart/cart-detail/', {
        headers: {
          'Authorization': `Bearer ${parsedToken.access}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      dispatch({ type: 'SET_CART', payload: data });
      
      // Check if cart is empty
      if (data.length === 0) {
        navigate('/cart');
        return;
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  };

  const fetchSavedAddresses = async () => {
    try {
      if (!parsedToken && !parsedToken.access) return;

      const response = await fetch('http://127.0.0.1:8000/api/address/create-get/', {
        headers: {
          'Authorization': `Bearer ${parsedToken.access}`,
        },
      });
      

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();
      setSavedAddresses(data);
      
      // Set default address if available
      const defaultAddress = data.find(address => address.is_default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      } else if (data.length > 0) {
        setSelectedAddress(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  };

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (addressErrors[name]) {
      setAddressErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCardFormChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'card_number') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardForm(prev => ({
        ...prev,
        [name]: formatted.substring(0, 19) // Limit to 16 digits + 3 spaces
      }));
    } else {
      setCardForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (cardErrors[name]) {
      setCardErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateAddressForm = () => {
    const errors = {};
    if (!addressForm.full_name.trim()) errors.full_name = 'Name is required';
    if (!addressForm.phone.trim()) errors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(addressForm.phone)) errors.phone = 'Enter a valid 10-digit phone number';
    
    if (!addressForm.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(addressForm.email)) errors.email = 'Enter a valid email address';
    
    if (!addressForm.address_line1.trim()) errors.address_line1 = 'Address is required';
    if (!addressForm.city.trim()) errors.city = 'City is required';
    if (!addressForm.state.trim()) errors.state = 'State is required';
    if (!addressForm.pincode.trim()) errors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(addressForm.pincode)) errors.pincode = 'Enter a valid 6-digit pincode';
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCardForm = () => {
    const errors = {};
    const cardNumberNoSpaces = cardForm.card_number.replace(/\s/g, '');
    
    if (!cardNumberNoSpaces) errors.card_number = 'Card number is required';
    else if (!/^\d{16}$/.test(cardNumberNoSpaces)) errors.card_number = 'Enter a valid 16-digit card number';
    
    if (!cardForm.name_on_card.trim()) errors.name_on_card = 'Name is required';
    
    if (!cardForm.expiry_month) errors.expiry_month = 'Required';
    if (!cardForm.expiry_year) errors.expiry_year = 'Required';
    
    if (!cardForm.cvv.trim()) errors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(cardForm.cvv)) errors.cvv = 'Enter a valid CVV';
    
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    
    if (!validateAddressForm()) return;
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/user/addresses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addressForm),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save address');
      }
      
      const newAddress = await response.json();
      
      // Update addresses list
      setSavedAddresses(prev => [...prev, newAddress]);
      setSelectedAddress(newAddress.id);
      setShowAddAddressForm(false);
      
      // Reset form
      setAddressForm({
        full_name: '',
        phone: '',
        email: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
        is_default: false
      });
      
      console.log("Address saved successfully");
    } catch (error) {
      console.error('Error saving address:', error);
      setError("Failed to save address. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    // Validate required fields based on payment method
    if (paymentMethod === 'card' && !validateCardForm()) {
      return;
    }
    
    if (!selectedAddress && !showAddAddressForm) {
      setError("Please select a delivery address");
      return;
    }
    
    if (showAddAddressForm && !validateAddressForm()) {
      return;
    }
    
    try {
      setProcessingPayment(true);
      const token = localStorage.getItem('authToken');
      
      // If adding a new address during checkout
      let addressId = selectedAddress;
      if (showAddAddressForm) {
        // Save address first
        const addressResponse = await fetch('http://127.0.0.1:8000/api/user/addresses/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(addressForm),
        });
        
        if (!addressResponse.ok) {
          throw new Error('Failed to save address');
        }
        
        const newAddress = await addressResponse.json();
        addressId = newAddress.id;
      }
      
      // Create order
      const orderData = {
        address_id: addressId,
        payment_method: paymentMethod,
        payment_details: paymentMethod === 'card' ? {
          card_number: cardForm.card_number.replace(/\s/g, '').substring(0, 16),
          name_on_card: cardForm.name_on_card,
          expiry: `${cardForm.expiry_month}/${cardForm.expiry_year}`,
          // Don't send CVV to the server in a real app for security reasons
        } : null
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      
      
      // Navigate to order confirmation
      const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
      navigate('/order-confirmation', { 
        state: {
          orderId,
          total: calculateTotal(),
          paymentMethod,
          address: savedAddresses.find(addr => addr.id === selectedAddress) || addressForm
        } 
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError("Failed to place order. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  // Helper function to get selected address object
  const getSelectedAddressObject = () => {
    return savedAddresses.find(addr => addr.id === selectedAddress);
  };

  // Calculation functions
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      return total + ((item.price - (item.discount || 0)) * (item.quantity || 1));
    }, 0);
  };

  const calculateDiscount = () => {
    return appliedCoupon ? appliedCoupon.discount_amount : 0;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 499 ? 0 : 40;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const discount = calculateDiscount();
    return subtotal + shipping - discount;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2 md:mt-0"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <Card className="overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-white font-medium flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Delivery Address
                </h2>
              </div>
              <div className="p-6">
                {savedAddresses.length > 0 && !showAddAddressForm && (
                  <div className="space-y-4">
                    {savedAddresses.map((address) => (
                      <div 
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAddress === address.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedAddress(address.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={`address-${address.id}`}
                                name="selected-address"
                                className="mr-2 h-4 w-4 text-blue-600"
                                checked={selectedAddress === address.id}
                                onChange={() => setSelectedAddress(address.id)}
                              />
                              <label htmlFor={`address-${address.id}`} className="font-medium text-gray-900">
                                {address.full_name} {address.is_default && <span className="text-blue-600 text-sm ml-2">(Default)</span>}
                              </label>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 ml-6 space-y-1">
                              <p className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                <span>
                                  {address.address_line1}, 
                                  {address.address_line2 && ` ${address.address_line2},`} 
                                  {` ${address.city}, ${address.state} - ${address.pincode}`}
                                </span>
                              </p>
                              <p className="flex items-center">
                                <PhoneCall className="w-4 h-4 mr-2 shrink-0" />
                                {address.phone}
                              </p>
                              <p className="flex items-center">
                                <Mail className="w-4 h-4 mr-2 shrink-0" />
                                {address.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(true)}
                      className="w-full flex items-center justify-center py-3 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:border-blue-500 hover:bg-blue-50"
                    >
                      + Add a new address
                    </button>
                  </div>
                )}

                {(showAddAddressForm || savedAddresses.length === 0) && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Add New Address</h3>
                    <form onSubmit={handleSaveAddress} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="full_name"
                              name="full_name"
                              value={addressForm.full_name}
                              onChange={handleAddressFormChange}
                              className={`pl-10 block w-full border ${addressErrors.full_name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              placeholder="John Doe"
                            />
                          </div>
                          {addressErrors.full_name && <p className="mt-1 text-sm text-red-600">{addressErrors.full_name}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PhoneCall className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={addressForm.phone}
                              onChange={handleAddressFormChange}
                              className={`pl-10 block w-full border ${addressErrors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              placeholder="1234567890"
                            />
                          </div>
                          {addressErrors.phone && <p className="mt-1 text-sm text-red-600">{addressErrors.phone}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={addressForm.email}
                            onChange={handleAddressFormChange}
                            className={`pl-10 block w-full border ${addressErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="your@email.com"
                          />
                        </div>
                        {addressErrors.email && <p className="mt-1 text-sm text-red-600">{addressErrors.email}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                        <input
                          type="text"
                          id="address_line1"
                          name="address_line1"
                          value={addressForm.address_line1}
                          onChange={handleAddressFormChange}
                          className={`block w-full border ${addressErrors.address_line1 ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          placeholder="Street address, apartment, etc."
                        />
                        {addressErrors.address_line1 && <p className="mt-1 text-sm text-red-600">{addressErrors.address_line1}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700">
                          Address Line 2 <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="address_line2"
                          name="address_line2"
                          value={addressForm.address_line2}
                          onChange={handleAddressFormChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Apartment, suite, building, etc."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressFormChange}
                            className={`block w-full border ${addressErrors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          />
                          {addressErrors.city && <p className="mt-1 text-sm text-red-600">{addressErrors.city}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressFormChange}
                            className={`block w-full border ${addressErrors.state ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          />
                          {addressErrors.state && <p className="mt-1 text-sm text-red-600">{addressErrors.state}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                          <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={addressForm.pincode}
                            onChange={handleAddressFormChange}
                            className={`block w-full border ${addressErrors.pincode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="6-digit pincode"
                          />
                          {addressErrors.pincode && <p className="mt-1 text-sm text-red-600">{addressErrors.pincode}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="is_default"
                          name="is_default"
                          type="checkbox"
                          checked={addressForm.is_default}
                          onChange={handleAddressFormChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_default" className="ml-2 block text-sm text-gray-900">
                          Set as my default address
                        </label>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        {savedAddresses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setShowAddAddressForm(false)}
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </Card>

            {/* Payment Method Section */}
            <Card className="overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-white font-medium flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="card-payment"
                      name="payment-method"
                      type="radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="card-payment" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit / Debit Card
                    </label>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="pl-7 mt-3 space-y-4 border-l-2 border-blue-100">
                      <div>
                        <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="card_number"
                            name="card_number"
                            value={cardForm.card_number}
                            onChange={handleCardFormChange}
                            className={`pl-10 block w-full border ${cardErrors.card_number ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        {cardErrors.card_number && <p className="mt-1 text-sm text-red-600">{cardErrors.card_number}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700">Name on Card</label>
                        <input
                          type="text"
                          id="name_on_card"
                          name="name_on_card"
                          value={cardForm.name_on_card}
                          onChange={handleCardFormChange}
                          className={`block w-full border ${cardErrors.name_on_card ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          placeholder="John Doe"
                        />
                        {cardErrors.name_on_card && <p className="mt-1 text-sm text-red-600">{cardErrors.name_on_card}</p>}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label htmlFor="expiry_month" className="block text-sm font-medium text-gray-700">Month</label>
                          <select
                            id="expiry_month"
                            name="expiry_month"
                            value={cardForm.expiry_month}
                            onChange={handleCardFormChange}
                            className={`mt-1 block w-full py-2 px-3 border ${cardErrors.expiry_month ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = i + 1;
                              return (
                                <option key={month} value={month.toString().padStart(2, '0')}>
                                  {month.toString().padStart(2, '0')}
                                </option>
                              );
                            })}
                          </select>
                          {cardErrors.expiry_month && <p className="mt-1 text-sm text-red-600">{cardErrors.expiry_month}</p>}
                        </div>
                        
                        <div className="col-span-1">
                          <label htmlFor="expiry_year" className="block text-sm font-medium text-gray-700">Year</label>
                          <select
                            id="expiry_year"
                            name="expiry_year"
                            value={cardForm.expiry_year}
                            onChange={handleCardFormChange}
                            className={`mt-1 block w-full py-2 px-3 border ${cardErrors.expiry_year ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i;
                              return (
                                <option key={year} value={year.toString().slice(2)}>
                                  {year.toString().slice(2)}
                                </option>
                              );
                            })}
                          </select>
                          {cardErrors.expiry_year && <p className="mt-1 text-sm text-red-600">{cardErrors.expiry_year}</p>}
                        </div>
                        
                        <div className="col-span-1">
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                          <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            value={cardForm.cvv}
                            onChange={handleCardFormChange}
                            maxLength="4"
                            className={`mt-1 block w-full py-2 px-3 border ${cardErrors.cvv ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="123"
                          />
                          {cardErrors.cvv && <p className="mt-1 text-sm text-red-600">{cardErrors.cvv}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Lock className="w-4 h-4 mr-1 text-gray-400" />
                        Your payment information is processed securely.
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      id="cod-payment"
                      name="payment-method"
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="cod-payment" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                  
                  {paymentMethod === 'cod' && (
                    <div className="pl-7 mt-2 text-sm text-gray-500 border-l-2 border-blue-100 py-2">
                      Pay with cash upon delivery. Additional COD charges may apply.
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                  <h2 className="text-white font-medium">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  {/* Mobile Order Summary Toggle */}
                  <div className="lg:hidden mb-4">
                    <button
                      type="button"
                      onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                      className="flex items-center justify-between w-full font-medium text-blue-600"
                    >
                      <span>
                        {orderSummaryOpen ? 'Hide' : 'Show'} order summary 
                        <span className="ml-1 font-semibold">
                          (₹{calculateTotal().toFixed(2)})
                        </span>
                      </span>
                      {orderSummaryOpen ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </button>
                  </div>
                  
                  {/* Order Items */}
                  <div className={`space-y-4 ${!orderSummaryOpen && 'hidden lg:block'}`}>
                    {cart.map((item) => (
                      <div key={item.id} className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-100 rounded border flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-gray-400 text-xs text-center">No image</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {item.variant}
                            {item.quantity > 1 && ` × ${item.quantity}`}
                          </p>
                          <div className="mt-1 text-sm">
                            <span className="font-medium">₹{((item.price - (item.discount || 0)) * (item.quantity || 1)).toFixed(2)}</span>
                            {item.discount > 0 && (
                              <span className="line-through text-gray-400 ml-2">
                                ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Price Details */}
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Price Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span>₹{calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Shipping</span>
                          {calculateShipping() === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            <span>₹{calculateShipping().toFixed(2)}</span>
                          )}
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Discount</span>
                            <span className="text-green-600">-₹{calculateDiscount().toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                          <span>Total</span>
                          <span>₹{calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Benefits */}
                    <div className="space-y-2 pt-2">
                      {calculateShipping() === 0 && (
                        <div className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                          <span>Free shipping applied</span>
                        </div>
                      )}
                      <div className="flex items-start text-sm">
                        <Truck className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                        <span>Delivery within 3-5 business days</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <ShieldCheck className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                        <span>Secure payments</span>
                      </div>
                    </div>
                    
                    {/* Place Order Button */}
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={processingPayment}
                      className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 
                        ${processingPayment ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      {processingPayment ? (
                        <>
                          <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5" />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;