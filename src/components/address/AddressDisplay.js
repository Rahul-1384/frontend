// src/components/address/AddressDisplay.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const AddressDisplay = ({ address }) => {
  if (!address) return null;
  
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
    <div className="flex md:flex-1 md:justify-start lg:justify-start">
      <NavLink 
        to="/addresses" 
        className="flex items-center no-underline text-gray-200 hover:bg-slate-800 px-2 py-1 rounded-md transition-colors duration-200"
      >
        <MapPin 
          size={16} 
          className="text-gray-400 flex-shrink-0" 
          strokeWidth={2.5}
        />
        <div className="ml-1.5 flex flex-col">
          <span className="text-xs font-normal text-gray-400 hidden sm:inline">
            Deliver to {full_name}
          </span>
          <span className="text-xs font-normal text-gray-400 sm:hidden">
            Deliver to {full_name?.split(' ')[0]}
          </span>
          <div className="flex text-sm items-center gap-1">
            <span className="font-medium">{city}</span>
            <span className="font-medium">{pincode}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default AddressDisplay;