'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, X, Search } from 'lucide-react';

interface CitiesAllExpandableProps {
  allCities: string[];
  topCities: string[];
  sampleCities: string[];
}

export function CitiesAllExpandable({
  allCities,
  topCities,
  sampleCities,
}: CitiesAllExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');

  const otherCities = useMemo(
    () => allCities.filter((city) => !topCities.includes(city)),
    [allCities, topCities]
  );

  const filteredCities = useMemo(() => {
    if (!search) return otherCities;
    const term = search.toLowerCase();
    return otherCities.filter((city) => city.toLowerCase().includes(term));
  }, [search, otherCities]);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Other Cities
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
        >
          {expanded ? 'Close' : 'View All'} {expanded ? <X className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {sampleCities.map((city) => (
          <div
            key={city}
            className="text-center p-2.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border border-gray-100 hover:border-blue-200"
          >
            <div className="text-xs font-medium text-gray-900 truncate">{city}</div>
          </div>
        ))}
      </div>

      {expanded && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cities..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="text-center p-2.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="text-xs font-medium text-gray-900 truncate">{city}</div>
                </div>
              ))}
            </div>
            {filteredCities.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No cities found matching your search</p>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-xs text-gray-600">
            Showing {filteredCities.length} of {otherCities.length} cities
          </div>
        </div>
      )}
    </div>
  );
}
