// src/components/address/AddressCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, StarIcon } from 'lucide-react';

const AddressCard = ({ address, onDelete, onSetDefault }) => {
  const {
    id,
    full_name,
    mobile_number,
    flat_building_apartment,
    area_street_village,
    landmark,
    city,
    state,
    pincode,
    country_region,
    default_address
  } = address;

  return (
    <div className={`border rounded-lg p-4 ${default_address ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="font-bold text-lg">{full_name}</p>
          <p className="text-gray-600">{mobile_number}</p>
        </div>
        {default_address && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <StarIcon className="w-3 h-3 mr-1" />
            Default
          </span>
        )}
      </div>
      
      <div className="text-gray-700 mb-4">
        <p>{flat_building_apartment}</p>
        <p>{area_street_village}</p>
        {landmark && <p>{landmark}</p>}
        <p>{city}, {state} - {pincode}</p>
        <p>{country_region}</p>
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="space-x-2">
          <Link 
            to={`/address/edit/${id}`} 
            className="inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button 
            onClick={onDelete}
            className="inline-flex items-center text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1 px-3 rounded"
          >
            <TrashIcon className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
        
        {!default_address && (
          <button 
            onClick={onSetDefault}
            className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-1 px-3 rounded"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;