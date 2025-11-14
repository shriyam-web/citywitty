import { MapPin } from 'lucide-react';
import allCitiesRaw from '@/data/allCities.json';
import { CitiesAllExpandable } from './cities-all-expandable';

const TOP_CITIES = [
  'Delhi',
  'Mumbai',
  'Lucknow',
  'Noida',
  'Greater Noida',
  'Ahmedabad',
  'Kolkata',
  'Bangalore',
];

const IMPORTANT_CITIES = [
  'Delhi',
  'Lucknow',
  'Noida',
  'Greater Noida',
  'Agra',
  'Prayagraj (Allahabad)',
];

const ALL_CITIES = allCitiesRaw as string[];

export function CitiesPresence() {
  const topCities = ALL_CITIES.filter((city) => TOP_CITIES.includes(city));
  const otherCitiesSample = ALL_CITIES.filter((city) => !TOP_CITIES.includes(city)).slice(0, 12);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Available Across India
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Expanding in <span className="font-semibold text-blue-600">{ALL_CITIES.length}+ cities</span> and growing every day
          </p>
        </div>

        {/* Top Cities Grid - Compact */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Major Cities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            {topCities.map((city) => (
              <div
                key={city}
                className={`rounded-lg p-3 text-center hover:shadow-md transition-all cursor-pointer transform hover:scale-105 border ${IMPORTANT_CITIES.includes(city)
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-400'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-300'
                  }`}
              >
                <MapPin className="h-4 w-4 mx-auto mb-1 opacity-90" />
                <div className="text-xs sm:text-sm font-semibold truncate">{city}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Cities - Expandable */}
        <CitiesAllExpandable
          allCities={ALL_CITIES}
          topCities={TOP_CITIES}
          sampleCities={otherCitiesSample}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          <div className="text-center p-4 rounded-lg bg-white border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{ALL_CITIES.length}+</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Cities Will be Covered</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Available</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white border border-gray-100 col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-bold text-green-600">100%</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Coverage</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-xs md:text-sm text-gray-600 mb-3">
            Missing your city? Help us expand to your location
          </p>
          <a
            href="mailto:expand@citywitty.com"
            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Suggest Your City
          </a>
        </div>
      </div>

      {/* Schema Markup for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'CityWitty',
            areaServed: ALL_CITIES.map((city) => ({
              '@type': 'City',
              name: city,
              areaServed: 'IN'
            })),
            description: `CityWitty operates across ${ALL_CITIES.length}+ cities in India, connecting customers with merchants in ${TOP_CITIES.join(', ')} and many more locations.`
          })
        }}
      />
    </section>
  );
}
