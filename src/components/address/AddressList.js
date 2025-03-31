import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import addressService from '../../services/addressService';
import AddressCard from './AddressCard';
import { PlusIcon,Edit2, Trash2, AlertCircle, LogIn, UserX, RefreshCw, CheckCircle } from 'lucide-react';
import bookefy from '../../images/rebook-logo.png';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses();
      setAddresses(data);
      setError(null);
      setErrorType(null);
    } catch (err) {
      // console.error('Error fetching addresses:', err);
      
      // Check for 401 status code or the specific error message about authentication credentials
      if (
        (err.response && err.response.status === 401) || 
        (err.detail === 'Authentication credentials were not provided.')
      ) {
        navigate(`/login?returnUrl=${encodeURIComponent('/addresses')}`);
        return; // Exit the function early
      } else if (err.message && err.message.includes('network')) {
        setErrorType('network');
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setErrorType('general');
        setError('Something went wrong while loading your addresses. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await addressService.deleteAddress(id);
        setAddresses(addresses.filter(address => address.id !== id));
        
        // Show success message (could use a toast notification system here)
        const successTimer = setTimeout(() => {
          // Clear success message after 3 seconds
        }, 3000);
        
        return () => clearTimeout(successTimer);
        
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setErrorType('auth');
          setError('You need to be logged in to delete an address');
        } else {
          setErrorType('general');
          setError('Failed to delete address. Please try again.');
        }
        // console.error(err);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const address = addresses.find(addr => addr.id === id);
      if (!address.default_address) {
        await addressService.updateAddress(id, { ...address, default_address: true });
        // Refresh the addresses to reflect the new default
        fetchAddresses();
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setErrorType('auth');
        setError('You need to be logged in to set a default address');
      } else {
        setErrorType('general');
        setError('Failed to set address as default. Please try again.');
      }
      console.error(err);
    }
  };

  const handleLogin = () => {
    navigate('/login', { state: { returnUrl: '/addresses' } });
  };

  const renderErrorMessage = () => {
    const errorClasses = {
      auth: "bg-blue-50 border-blue-200 text-blue-800",
      network: "bg-orange-50 border-orange-200 text-orange-800",
      general: "bg-red-50 border-red-200 text-red-800"
    };
    
    const errorIcons = {
      auth: <UserX className="text-blue-500 mr-3 flex-shrink-0" size={24} />,
      network: <AlertCircle className="text-orange-500 mr-3 flex-shrink-0" size={24} />,
      general: <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={24} />
    };
    
    return (
      <div className={`border rounded-lg p-6 flex items-start ${errorClasses[errorType] || errorClasses.general}`}>
        {errorIcons[errorType] || errorIcons.general}
        <div className="flex-1">
          <p className="font-medium text-lg mb-2">{error}</p>
          
          {errorType === 'auth' && (
            <div className="mt-6 space-y-4">
              <button 
                onClick={handleLogin}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <LogIn size={18} className="mr-2" />
                Log in to your account
              </button>
              <p className="text-blue-700">
                Don't have an account? <Link to="/register" className="text-blue-800 font-medium hover:underline">Create one now</Link>
              </p>
            </div>
          )}
          
          {errorType === 'network' && (
            <button 
              onClick={fetchAddresses}
              className="mt-4 flex items-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
            >
              <RefreshCw size={16} className="mr-2" />
              Try again
            </button>
          )}
          
          {errorType === 'general' && (
            <button 
              onClick={fetchAddresses}
              className="mt-4 flex items-center bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
            >
              <RefreshCw size={16} className="mr-2" />
              Retry
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading your addresses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <p className="text-3xl font-bold text-gray-900">Your Addresses</p>
      </div>
      
      {error ? (
        renderErrorMessage()
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Address Card */}
          {!error && addresses.length > 0 && (
            <Link to="/address/add" className="border-2 no-underline border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
                <PlusIcon size={40} className="mb-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
                <div className="text-lg font-medium group-hover:text-blue-600 transition-colors">Add address</div>
            </Link>
          )}
          
          {/* Address Cards */}
          {addresses.map(address => (
            <div key={address.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              {address.default_address && (
                <div className="bg-white flex px-4 py-2 border-b border-blue-100 text-sm">
                  <span className="font-medium text-gray-600 mr-5">Default Address</span> 
                  <span className="font-medium text-blue-700"><img src={bookefy} alt='' width="20" className='scale-[2.7]' /> </span>
                </div>
              )}
              
              <div className="px-3 py-4">
                <div className="font-medium text-lg">{address.full_name}</div>
                <div className="text-gray-700 mt-1">
                  {address.flat_building_apartment}, {address.area_street_village}
                </div>
                <div className="text-gray-700">
                  {address.city}, {address.state} {address.pincode}
                </div>
                <div className="text-gray-700 mt-1">{address.country_region}</div>
                <div className="text-gray-700 mt-2 font-medium">Phone: {address.mobile_number}</div>
                
                <div className="flex mt-6 space-x-4 text-sm">
                  <Link 
                    to={`/address/edit/${address.id}`} 
                    className="flex items-center text-blue-600 hover:text-blue-800 no-underline transition-colors"
                  >
                    <Edit2 size={14} className="mr-1" /> Edit
                  </Link>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => handleDelete(address.id)} 
                    className="flex items-center text-red-600 hover:text-red-800 bg-transparent border-none p-0 cursor-pointer transition-colors"
                  >
                    <Trash2 size={14} className="mr-1" /> Remove
                  </button>
                  {!address.default_address && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => handleSetDefault(address.id)} 
                        className="text-blue-600 hover:text-blue-800 bg-transparent border-none p-0 cursor-pointer transition-colors"
                      >
                        Set as Default
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!error && addresses.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4"><UserX size={48} className="inline-block" /></div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">No addresses found</h2>
          <p className="text-gray-500 mb-6">You haven't added any addresses to your account yet.</p>
          <Link to="/address/add" className="border-2 no-underline border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
            <PlusIcon size={40} className="mb-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
            <div className="text-lg font-medium group-hover:text-blue-600 transition-colors">Add address</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddressList;