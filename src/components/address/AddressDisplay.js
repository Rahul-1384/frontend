// src/components/address/AddressDisplay.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Plus } from 'lucide-react';

const AddressDisplay = ({ address }) => {
  if (!address) {
    return (
      <div className="flex lg:justify-start md:flex-1 md:justify-start">
        <NavLink 
          to="/addresses" 
          className="flex rounded-md text-gray-200 duration-200 hover:bg-slate-800 items-center no-underline px-2 py-1 transition-colors"
        >
          <Plus 
            size={16} 
            className="flex-shrink-0 text-gray-400" 
            strokeWidth={2.5}
          />
          <span className="text-gray-400 text-sm font-medium ml-1.5">
            Add Address
          </span>
        </NavLink>
      </div>
    );
  }
  const {
    full_name,
    mobile_number,
    flat_building_apartment,
    area_street_village,
    city,
    state,
    pincode,
    country_region,
    default_address
  } = address;
  
  return (
    <div className="flex lg:justify-start md:flex-1 md:justify-start">
      <NavLink 
        to="/addresses" 
        className="flex rounded-md text-gray-200 duration-200 hover:bg-slate-800 items-center no-underline px-2 py-1 transition-colors"
      >
        <MapPin 
          size={16} 
          className="flex-shrink-0 text-gray-400" 
          strokeWidth={2.5}
        />
        <div className="flex flex-col ml-1.5">
          <span className="text-gray-400 text-xs font-normal hidden sm:inline">
            Deliver to {full_name}
          </span>
          <span className="text-gray-400 text-xs font-normal sm:hidden">
            Deliver to {full_name?.split(' ')[0]}
          </span>
          <div className="flex text-sm gap-1 items-center">
            <span className="font-medium">{city}</span>
            <span className="font-medium">{pincode}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default AddressDisplay;