'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink } from 'lucide-react';

declare global {
    interface Window {
        google: any;
    }
}

interface BranchLocation {
    branchName: string;
    city: string;
    streetAddress: string;
    pincode: string;
    locality: string;
    state: string;
    country: string;
    mapLocation: string;
    latitude: number;
    longitude: number;
}

interface BranchLocationsMapProps {
    branches: BranchLocation[];
}

export function BranchLocationsMap({ branches }: BranchLocationsMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapLoaded, setMapLoaded] = React.useState(false);

    useEffect(() => {
        if (branches.length > 0 && window.google && window.google.maps) {
            try {
                const map = new window.google.maps.Map(mapRef.current!, {
                    center: { lat: branches[0].latitude, lng: branches[0].longitude },
                    zoom: 12,
                    styles: [
                        {
                            featureType: 'poi',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                });

                const bounds = new window.google.maps.LatLngBounds();

                branches.forEach((branch, index) => {
                    const marker = new window.google.maps.Marker({
                        position: { lat: branch.latitude, lng: branch.longitude },
                        map: map,
                        title: branch.branchName,
                        label: (index + 1).toString()
                    });

                    const infoWindow = new window.google.maps.InfoWindow({
                        content: `
                <div class="p-2">
                  <h3 class="font-bold text-lg">${branch.branchName}</h3>
                  <p class="text-sm">${branch.streetAddress}, ${branch.locality}</p>
                  <p class="text-sm">${branch.city}, ${branch.state} - ${branch.pincode}</p>
                  <a href="${branch.mapLocation}" target="_blank" class="text-blue-600 hover:underline text-sm">View on Map</a>
                </div>
              `
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });

                    bounds.extend(marker.getPosition()!);
                });

                if (branches.length > 1) {
                    map.fitBounds(bounds);
                }

                setMapLoaded(true);
            } catch (error) {
                console.error('Failed to load map:', error);
                setMapLoaded(false);
            }
        } else {
            setMapLoaded(false);
        }
    }, [branches]);

    if (branches.length === 0) {
        return null;
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-6 w-6" />
                    <span>Branch Locations</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {mapLoaded && (
                    <div ref={mapRef} className="w-full h-64 rounded-lg mb-6" style={{ minHeight: '256px' }}></div>
                )}
                <div className="space-y-4">
                    {branches.map((branch, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg mb-2">{branch.branchName}</h4>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {branch.streetAddress}, {branch.locality}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {branch.city}, {branch.state} - {branch.pincode}
                                    </p>
                                    <Badge variant="outline" className="text-xs">
                                        {branch.country}
                                    </Badge>
                                </div>
                                <a
                                    href={branch.mapLocation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="text-sm">Directions</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
