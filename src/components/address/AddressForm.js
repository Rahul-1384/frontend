// src/components/address/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import addressService from '../../services/addressService';

// Constants for country and state choices matching Django model
const COUNTRY_CHOICES = [
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Canada', label: 'Canada' },
  { value: 'China', label: 'China' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'India', label: 'India' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Russia', label: 'Russia' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'Other', label: 'Other' },
];

const STATE_CHOICES = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' },
  { value: 'Other', label: 'Other' },
];

const initialFormState = {
  country_region: 'India',
  full_name: '',
  mobile_number: '',
  pincode: '',
  flat_building_apartment: '',
  area_street_village: '',
  landmark: '',
  city: '',
  state: 'Uttar Pradesh',
  default_address: false
};

const AddressForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const isEditMode = !!id;

  // Fetch address data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchAddress = async () => {
        try {
          setLoading(true);
          const data = await addressService.getAddressById(id);
          setFormData(data);
          setError(null);
        } catch (err) {
          setError('Failed to load address details');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchAddress();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear validation error when field is being edited
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }
    
    if (!formData.mobile_number.trim()) {
      errors.mobile_number = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      errors.mobile_number = 'Mobile number must be exactly 10 digits';
    }
    
    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = 'Pincode must be exactly 6 digits';
    }
    
    if (!formData.flat_building_apartment.trim()) {
      errors.flat_building_apartment = 'Building/Apartment details are required';
    }
    
    if (!formData.area_street_village.trim()) {
      errors.area_street_village = 'Area/Street/Village is required';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await addressService.updateAddress(id, formData);
      } else {
        await addressService.createAddress(formData);
      }
      
      navigate('/addresses');
    } catch (err) {
      if (err.hasOwnProperty('full_name')) {
        // Handle API validation errors
        setValidationErrors(err);
      } else {
        setError('Failed to save address');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="flex justify-center items-center h-64">Loading address details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Address' : 'Add New Address'}</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">{error}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country/Region
              </label>
              <select
                name="country_region"
                value={formData.country_region}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {COUNTRY_CHOICES.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.full_name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.full_name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.full_name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="10 digits"
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.mobile_number ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.mobile_number && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.mobile_number}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flat, House no., Building, Apartment
              </label>
              <input
                type="text"
                name="flat_building_apartment"
                value={formData.flat_building_apartment}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.flat_building_apartment ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.flat_building_apartment && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.flat_building_apartment}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area, Street, Village
              </label>
              <input
                type="text"
                name="area_street_village"
                value={formData.area_street_village}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.area_street_village ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.area_street_village && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.area_street_village}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.city && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {STATE_CHOICES.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6 digits"
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.pincode && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.pincode}</p>
              )}
            </div>
            
            <div className="col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="default_address"
                  name="default_address"
                  checked={formData.default_address}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="default_address" className="ml-2 block text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => navigate('/addresses')}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;