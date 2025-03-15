import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DropdownFilter = ({ label, options, selectedOptions, toggleSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between cursor-pointer" onClick={handleToggle}>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {isOpen ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
      </div>
      {isOpen && (
        <div className="relative w-full bg-white mt-1">
          {options.slice(0, showMore ? options.length : 5).map((option) => (
            <label key={option} className="block text-sm p-2 hover:bg-gray-100">
              <input
                type="checkbox"
                value={option.toLowerCase()}
                checked={selectedOptions.includes(option.toLowerCase())}
                onChange={() => toggleSelection(option.toLowerCase())}
                className="mr-2"
              />
              {option}
            </label>
          ))}
          {options.length > 5 && (
            <button
              onClick={handleShowMore}
              className="block w-full text-left p-2 text-blue-500 hover:bg-gray-100"
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;