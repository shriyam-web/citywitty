'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FaGoogle, FaSearch, FaCopy, FaCheck } from 'react-icons/fa';
import { Star, MapPin, Loader2 } from 'lucide-react';

interface PlaceResult {
    placeId: string;
    name: string;
    address: string;
    rating?: number;
    reviewCount?: number;
}

export default function GooglePlaceFinderPage() {
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<PlaceResult[]>([]);
    const [error, setError] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!businessName.trim()) {
            setError('Please enter a business name');
            return;
        }

        setLoading(true);
        setError('');
        setResults([]);

        try {
            const params = new URLSearchParams({
                name: businessName,
            });

            if (address.trim()) {
                params.append('address', address);
            }

            const response = await fetch(`/api/google-reviews/find-place?${params.toString()}`);
            const data = await response.json();

            if (!data.success) {
                setError(data.message || 'No results found');
                return;
            }

            setResults(data.results || []);
        } catch (err: any) {
            setError(err.message || 'Failed to search for place');
        } finally {
            setLoading(false);
        }
    };

    const copyPlaceId = (placeId: string) => {
        navigator.clipboard.writeText(placeId);
        setCopiedId(placeId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <FaGoogle className="text-[#4285F4]" />
                    Google Place ID Finder
                </h1>
                <p className="text-slate-600">
                    Find your business's Google Place ID to display live Google reviews on your merchant page
                </p>
            </div>

            {/* Search Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Search for Your Business</CardTitle>
                    <CardDescription>
                        Enter your business name and optionally your address to find your Google Place ID
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                            id="businessName"
                            placeholder="e.g., Cafe Coffee Day"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address (Optional)</Label>
                        <Input
                            id="address"
                            placeholder="e.g., Koramangala, Bangalore"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <p className="text-xs text-slate-500">
                            Adding an address helps narrow down the search results
                        </p>
                    </div>

                    <Button
                        onClick={handleSearch}
                        disabled={loading || !businessName.trim()}
                        className="w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>
                                <FaSearch className="mr-2 h-4 w-4" />
                                Search
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive" className="mb-8">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Search Results ({results.length})
                    </h2>

                    {results.map((result, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                            {result.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{result.address}</span>
                                        </div>
                                        {result.rating && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    <span className="font-semibold">{result.rating}</span>
                                                </div>
                                                <span className="text-slate-600">
                                                    ({result.reviewCount?.toLocaleString()} reviews)
                                                </span>
                                            </div>
                                        )}
                                        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="text-xs text-slate-600 mb-1">Place ID:</div>
                                            <code className="text-sm font-mono text-slate-900 break-all">
                                                {result.placeId}
                                            </code>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => copyPlaceId(result.placeId)}
                                        variant={copiedId === result.placeId ? "default" : "outline"}
                                        size="sm"
                                    >
                                        {copiedId === result.placeId ? (
                                            <>
                                                <FaCheck className="mr-2 h-4 w-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy className="mr-2 h-4 w-4" />
                                                Copy ID
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Instructions */}
            <Card className="mt-8 bg-blue-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-blue-900">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800 space-y-2">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Enter your business name as it appears on Google Maps</li>
                        <li>Optionally add your address to narrow down results</li>
                        <li>Click "Search" to find your business</li>
                        <li>Copy your Place ID from the results</li>
                        <li>Add the Place ID to your merchant profile settings</li>
                        <li>Your Google reviews will automatically appear on your public page!</li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    );
}