import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

const cities = [
  { name: 'Mumbai', merchants: 234, state: 'Maharashtra' },
  { name: 'Delhi', merchants: 198, state: 'Delhi' },
  { name: 'Bangalore', merchants: 167, state: 'Karnataka' },
  { name: 'Chennai', merchants: 145, state: 'Tamil Nadu' },
  { name: 'Pune', merchants: 123, state: 'Maharashtra' },
  { name: 'Hyderabad', merchants: 112, state: 'Telangana' },
  { name: 'Kolkata', merchants: 98, state: 'West Bengal' },
  { name: 'Ahmedabad', merchants: 87, state: 'Gujarat' },
  { name: 'Jaipur', merchants: 76, state: 'Rajasthan' },
  { name: 'Surat', merchants: 65, state: 'Gujarat' },
  { name: 'Lucknow', merchants: 54, state: 'Uttar Pradesh' },
  { name: 'Kanpur', merchants: 43, state: 'Uttar Pradesh' },
  { name: 'Nagpur', merchants: 41, state: 'Maharashtra' },
  { name: 'Visakhapatnam', merchants: 38, state: 'Andhra Pradesh' },
  { name: 'Indore', merchants: 35, state: 'Madhya Pradesh' },
  { name: 'Thane', merchants: 32, state: 'Maharashtra' },
  { name: 'Bhopal', merchants: 29, state: 'Madhya Pradesh' },
  { name: 'Coimbatore', merchants: 26, state: 'Tamil Nadu' },
  { name: 'Patna', merchants: 23, state: 'Bihar' },
  { name: 'Vadodara', merchants: 21, state: 'Gujarat' }
];

export function CitiesPresence() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Cities Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            CityWitty is expanding across major Indian cities, bringing you exclusive deals wherever you are
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {cities.slice(0, 8).map((city, index) => (
            <div
              key={city.name}
              className={`p-6 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 ${
                index < 4 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className={`h-5 w-5 ${index < 4 ? 'text-white' : 'text-blue-600'}`} />
                <h3 className={`text-lg font-semibold ${index < 4 ? 'text-white' : 'text-gray-900'}`}>
                  {city.name}
                </h3>
              </div>
              <p className={`text-sm mb-2 ${index < 4 ? 'text-blue-100' : 'text-gray-600'}`}>
                {city.state}
              </p>
              <Badge 
                variant="secondary" 
                className={index < 4 
                  ? 'bg-white/20 text-white border-white/30' 
                  : 'bg-blue-100 text-blue-700'
                }
              >
                {city.merchants} merchants
              </Badge>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            More Cities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.slice(8).map((city) => (
              <div key={city.name} className="text-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-sm font-medium text-gray-900">{city.name}</div>
                <div className="text-xs text-gray-500">{city.merchants} merchants</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Expanding to more cities soon. Request your city at{' '}
            <a href="mailto:expand@citywitty.com" className="text-blue-600 hover:underline">
              expand@citywitty.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}