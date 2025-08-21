'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

const CitySelector: React.FC = () => {
  const { state, dispatch } = useApp();

  const cities = [
    'All Cities', 
    'Mumbai', 
    'Delhi', 
    'Bangalore', 
    'Chennai', 
    'Kolkata', 
    'Hyderabad', 
    'Pune', 
    'Ahmedabad', 
    'Jaipur', 
    'Surat', 
    'Lucknow', 
    'Kanpur', 
    'Nagpur', 
    'Indore', 
    'Bhopal'
  ];

  const handleCityChange = (city: string) => {
    dispatch({ type: 'SET_SELECTED_CITY', payload: city });
  };

  return (
    <div className="text-center mb-5">
      <h3 className="mb-4">Select Your City</h3>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {cities.map((city) => (
          <button
            key={city}
            className={`btn ${
              state.selectedCity === city
                ? 'btn-primary'
                : 'btn-outline-primary'
            } px-4 py-2`}
            onClick={() => handleCityChange(city)}
          >
            <i className="fas fa-map-marker-alt me-2"></i>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySelector;