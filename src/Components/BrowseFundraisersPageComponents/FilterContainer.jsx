import React, { useRef, useEffect, useState } from 'react';
import SideBarFilterContainer from './SideBarFilterContainer';
import useScreenWidth from '../../hooks/useScreenWidth';

function FilterContainer() {
  const screenWidth = useScreenWidth();
  const [isFilterContainerOpen, setIsFilterContainerOpen] = useState(false);
  const filtertypes = ["All Types", "Tax Benefits", "Trending", "Urgently Funds Required", "Successfully Funded"];
  const locations = ["All Locations", "Mumbai", "Bengaluru", "New Delhi", "Hyderabad", "Chennai", "Delhi", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Gurugram", "Chandigarh"];

  const selectFilterTypeRef = useRef(null);
  const widthFilterTypeRef = useRef(null);
  const selectLocationRef = useRef(null);
  const widthLocationRef = useRef(null);

  const adjustWidth = (selectRef, widthRef) => {
    if (selectRef.current && widthRef.current) {
      const selectedText = selectRef.current.options[selectRef.current.selectedIndex].text;
      widthRef.current.innerText = selectedText;
      const newWidth = widthRef.current.offsetWidth;
      selectRef.current.style.width = `${newWidth + 75}px`; // Adding some padding
    }
  };

  const handleResetFilters = () => {
    selectFilterTypeRef.current.selectedIndex = 0;
    selectLocationRef.current.selectedIndex = 0;

    adjustWidth(selectFilterTypeRef, widthFilterTypeRef);
    adjustWidth(selectLocationRef, widthLocationRef);
  };

  useEffect(() => {
    const handleResize = () => {
      adjustWidth(selectFilterTypeRef, widthFilterTypeRef);
      adjustWidth(selectLocationRef, widthLocationRef);
    };

    handleResize();

    // Event listeners for when the selection changes
    selectFilterTypeRef.current.addEventListener('change', () => adjustWidth(selectFilterTypeRef, widthFilterTypeRef));
    selectLocationRef.current.addEventListener('change', () => adjustWidth(selectLocationRef, widthLocationRef));

    // Cleanup event listeners on component unmount
    return () => {
      if (selectFilterTypeRef.current) {
        selectFilterTypeRef.current.removeEventListener('change', handleResize);
      }
      if (selectLocationRef.current) {
        selectLocationRef.current.removeEventListener('change', handleResize);
      }
    };
  }, []);

  return (
    <div>
      <div className="bowse-fundraisers-filters">
        Showing fundraisers
        under
        <div className="custom-select-container">
          <select
            className="form-select custom-filter-container-filter-select"
            aria-label="Default select example"
            ref={selectFilterTypeRef}
          >
            {filtertypes.map((filtertype, index) => (
              <option key={index} value={filtertype}>{filtertype}</option>
            ))}
          </select>
          <div className="custom-select-width" ref={widthFilterTypeRef}></div>
        </div>
        from
        <div className="custom-select-container">
          <select
            className="form-select custom-filter-container-filter-select"
            aria-label="Default select example"
            ref={selectLocationRef}
          >
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
          <div className="custom-select-width" ref={widthLocationRef}></div>
        </div>
      </div>
      <span className='reset-filters'>
        {screenWidth > 900 ? (
          <span onClick={handleResetFilters}>Reset</span>
        ) : (
          <span onClick={() => setIsFilterContainerOpen(!isFilterContainerOpen)}>Set Filters</span>
        )}
      </span>
      {isFilterContainerOpen && (
        <SideBarFilterContainer 
          isFilterContainerOpen={isFilterContainerOpen} 
          setIsFilterContainerOpen={setIsFilterContainerOpen} 
        />
      )}
    </div>
  );
}

export default FilterContainer;