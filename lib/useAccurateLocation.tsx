'use client';

import { useState, useEffect } from 'react';

interface LocationData {
    lat: number;
    lng: number;
    city?: string;
    state?: string;
    country?: string;
}

export default function useAccurateLocation() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    // ✅ Hit apna Next.js API route instead of Google directly
                    const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
                    const data = await res.json();

                    let city, state, country;
                    if (data.results && data.results[0]) {
                        const components = data.results[0].address_components;
                        city =
                            components.find((c: any) => c.types.includes("locality"))?.long_name ||
                            components.find((c: any) => c.types.includes("sublocality"))?.long_name ||
                            components.find((c: any) => c.types.includes("administrative_area_level_2"))?.long_name ||
                            components.find((c: any) => c.types.includes("postal_town"))?.long_name ||
                            components.find((c: any) => c.types.includes("administrative_area_level_3"))?.long_name ||
                            "Unknown";

                        state = components.find((c: any) =>
                            c.types.includes("administrative_area_level_1")
                        )?.long_name;
                        country = components.find((c: any) =>
                            c.types.includes("country")
                        )?.long_name;
                    }

                    setLocation({
                        lat: latitude,
                        lng: longitude,
                        city,
                        state,
                        country,
                    });
                } catch (err) {
                    setError("Failed to fetch address.");
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, []);

    return { location, loading, error };
}
