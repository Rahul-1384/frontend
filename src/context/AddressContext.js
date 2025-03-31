// src/contexts/AddressContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import addressService from '../services/addressService';

const AddressContext = createContext();

export const useAddressContext = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses();
      setAddresses(data);
      
      // Set default address
      const defaultAddr = data.find(addr => addr.default_address) || data[0] || null;
      setDefaultAddress(defaultAddr);
      
      setError(null);
    } catch (err) {
      setError('Failed to load addresses');
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const addAddress = async (addressData) => {
    try {
      const newAddress = await addressService.createAddress(addressData);
      // Refresh all addresses to get any changes in default status
      await fetchAddresses();
      return newAddress;
    } catch (err) {
      throw err;
    }
  };

  const updateAddress = async (id, addressData) => {
    try {
      const updatedAddress = await addressService.updateAddress(id, addressData);
      // Refresh all addresses to get any changes in default status
      await fetchAddresses();
      return updatedAddress;
    } catch (err) {
      throw err;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await addressService.deleteAddress(id);
      // Refresh all addresses to update default address if needed
      await fetchAddresses();
    } catch (err) {
      throw err;
    }
  };

  const setAddressAsDefault = async (id) => {
    try {
      const address = addresses.find(addr => addr.id === id);
      if (address && !address.default_address) {
        await addressService.updateAddress(id, { ...address, default_address: true });
        await fetchAddresses();
      }
    } catch (err) {
      throw err;
    }
  };

  const value = {
    addresses,
    defaultAddress,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setAddressAsDefault,
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;