'use client';

import { useState, useEffect, useCallback } from 'react';

interface LocationData {
    lat: number;
    lng: number;
    city?: string;
    state?: string;
    country?: string;
    source: 'gps' | 'ip' | 'manual';
}

export default function useAccurateLocation() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Manual override
    const setManualLocation = (city: string) => {
        setLocation({
            lat: 0,
            lng: 0,
            city,
            state: "",
            country: "",
            source: "manual",
        });
    };

    const fetchLocation = useCallback(() => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            setLoading(false);
            return;
        }

        const fetchIPFallback = async () => {
            try {
                const ipRes = await fetch("https://ipapi.co/json/");
                const ipData = await ipRes.json();
                setLocation({
                    lat: ipData.latitude,
                    lng: ipData.longitude,
                    city: ipData.city,
                    state: ipData.region,
                    country: ipData.country_name,
                    source: "ip",
                });
            } catch {
                setError("IP lookup failed.");
            } finally {
                setLoading(false);
            }
        };

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
                    const data = await res.json();

                    let city = "Your Location", state = "", country = "";

                    if (data.results && data.results[0]) {
                        const components = data.results[0].address_components;
                        city =
                            components.find((c: any) => c.types.includes("sublocality_level_1"))?.long_name ||
                            components.find((c: any) => c.types.includes("sublocality"))?.long_name ||
                            components.find((c: any) => c.types.includes("neighborhood"))?.long_name ||
                            components.find((c: any) => c.types.includes("locality"))?.long_name ||
                            components.find((c: any) => c.types.includes("postal_town"))?.long_name ||
                            components.find((c: any) => c.types.includes("administrative_area_level_3"))?.long_name ||
                            components.find((c: any) => c.types.includes("administrative_area_level_2"))?.long_name ||
                            components.find((c: any) => c.types.includes("administrative_area_level_1"))?.long_name ||
                            "Unknown";

                        state = components.find((c: any) => c.types.includes("administrative_area_level_1"))?.long_name;
                        country = components.find((c: any) => c.types.includes("country"))?.long_name;
                    }

                    setLocation({ lat: latitude, lng: longitude, city, state, country, source: "gps" });
                } catch (err) {
                    setError("Failed to fetch geocode, using IP fallback.");
                    await fetchIPFallback();
                } finally {
                    setLoading(false);
                }
            },
            async (err) => {
                setError(err.message || "GPS denied. Using IP fallback.");
                await fetchIPFallback();
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    return { location, loading, error, setManualLocation, refetch: fetchLocation };
}
