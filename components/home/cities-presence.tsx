'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search } from 'lucide-react';
import allCitiesRaw from '@/data/allCities.json';

export function CitiesPresence() {
  const [visibleCount, setVisibleCount] = useState(24);
  const [search, setSearch] = useState('');

  // Convert string array into object array
  const allCities = allCitiesRaw.map((city: string) => ({
    name: city,
    state: '', // placeholder
    merchants: 0, // placeholder
  }));

  // ✅ Manually define top 8 highlighted cities
  const topCities = [
    'Delhi',
    'Mumbai',
    'Lucknow',
    'Agra',
    'Prayagraj (Allahabad)',
    'Kolkata',
    'Noida',
    'Greater Noida',
  ];

  const highlightCities = allCities.filter((c) =>
    topCities.includes(c.name)
  );

  // Rest of the cities
  const otherCities = allCities.filter(
    (c) => !topCities.includes(c.name)
  );

  // Filter logic for search
  const filteredCities = useMemo(() => {
    if (!search) return otherCities;
    return otherCities.filter((city) =>
      city.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, otherCities]);

  return (
    <section className="py-20 relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            CityWitty Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly connecting customers & merchants across{' '}
            <span className="font-semibold text-blue-600">
              {allCities.length}+
            </span>{' '}
            cities 🎉
          </p>
        </div>

        {/* Highlighted Top Cities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlightCities.map((city, index) => (
            <div
              key={`${city.name}-${index}`}
              className={`p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${index < 4
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl'
                : 'bg-white shadow-md hover:shadow-xl border border-gray-100'
                }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <MapPin
                  className={`h-5 w-5 ${index < 4 ? 'text-white' : 'text-blue-600'
                    }`}
                />
                <h3
                  className={`text-lg font-semibold ${index < 4 ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {city.name}
                </h3>
              </div>
              {city.state && (
                <p
                  className={`text-sm mb-3 ${index < 4 ? 'text-blue-100' : 'text-gray-600'
                    }`}
                >
                  {city.state}
                </p>
              )}
              <Badge
                variant="secondary"
                className={
                  index < 4
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-blue-100 text-blue-700'
                }
              >
                {/* {city.merchants || 'Coming soon'} */}
              </Badge>
            </div>
          ))}
        </div>

        {/* Search + Other Cities */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find Your City
          </h3>

          {/* Search Box */}
          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your city..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCities.slice(0, visibleCount).map((city, index) => (
              <div
                key={`${city.name}-${index}`}
                className="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="text-base font-semibold text-gray-900">
                  {city.name}
                </div>
                <div className="text-xs text-gray-500">
                  {/* {city.merchants || 'Coming soon'} */}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredCities.length && !search && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(visibleCount + 24)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Load More Cities
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Can’t find your city? Help CityWitty expand! 🚀 <br />
            Write to us at{' '}
            <a
              href="mailto:expand@citywitty.com"
              className="text-blue-600 font-medium hover:underline"
            >
              expand@citywitty.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
