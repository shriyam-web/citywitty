'use client';

import { useState, useEffect } from 'react';

interface Merchant {
  _id: string;
  merchantId: string;
  displayName: string;
  merchantSlug: string;
  email: string;
  status: string;
  city: string;
  category: string;
  createdAt: string;
}

const ADMIN_PASSWORD = 'cw'; // Basic password - should be changed in production

export default function AdminMerchantsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchMerchants();
    } else {
      setError('Invalid password');
    }
  };

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/merchants');
      if (response.ok) {
        const data = await response.json();
        // Sort by createdAt descending (latest first)
        const sortedData = data.sort((a: Merchant, b: Merchant) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setMerchants(sortedData);
        setFilteredMerchants(sortedData);
      } else {
        setError('Failed to fetch merchants');
      }
    } catch (err) {
      setError('Error fetching merchants');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter merchants based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMerchants(merchants);
    } else {
      const filtered = merchants.filter(merchant =>
        merchant.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.merchantId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMerchants(filtered);
    }
  }, [searchTerm, merchants]);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      suspended: 'bg-red-100 text-red-800 border-red-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${variants[status as keyof typeof variants] || variants.inactive}`}>
        {status}
      </span>
    );
  };

  const getProfileUrl = (slug: string) => {
    return `${window.location.origin}/merchants/${slug}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">🔒 Admin Access</h1>
            <p className="text-gray-600">Enter the admin password to view merchant list</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Merchants</h1>
            <button
              onClick={fetchMerchants}
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <span className="text-sm text-gray-600">{filteredMerchants.length} merchants</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

          <div className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredMerchants.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                {searchTerm ? 'No merchants match your search' : 'No merchants found'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Merchant & URL
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMerchants.map((merchant) => (
                      <tr key={merchant._id} className="group hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-gray-900">
                              {merchant.merchantId}
                            </span>
                            <button
                              onClick={() => navigator.clipboard.writeText(merchant.merchantId)}
                              className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Copy ID"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <div className="text-sm font-medium text-gray-900">
                              {merchant.displayName}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 font-mono">
                                {getProfileUrl(merchant.merchantSlug)}
                              </span>
                              <button
                                onClick={() => navigator.clipboard.writeText(getProfileUrl(merchant.merchantSlug))}
                                className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Copy URL"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {merchant.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {merchant.city}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            merchant.status === 'active' ? 'bg-green-100 text-green-800' :
                            merchant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            merchant.status === 'suspended' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {merchant.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {merchant.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => window.open(getProfileUrl(merchant.merchantSlug), '_blank')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}