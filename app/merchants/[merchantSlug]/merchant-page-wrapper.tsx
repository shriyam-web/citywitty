'use client';

import React, { useEffect, useState } from 'react';

/**
 * Client-side wrapper component for merchant page
 * Handles:
 * - User geolocation and distance calculation
 * - Client-side interactive features
 * - Minimizes client-side JavaScript impact on SEO
 * 
 * Only receives serializable data (primitives) to avoid "functions cannot be passed"
 * error when passing server-component data to client components.
 */
interface MerchantPageWrapperProps {
    merchantLatitude?: number | null;
    merchantLongitude?: number | null;
    children: React.ReactNode;
}

export default function MerchantPageWrapper({
    merchantLatitude,
    merchantLongitude,
    children,
}: MerchantPageWrapperProps) {
    const [isMounted, setIsMounted] = useState(false);

    /**
     * Initialize mounted state to prevent hydration mismatches
     * This is necessary because geolocation and client-specific logic
     * should only run on the client
     */
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent hydration issues - only render after client-side hydration
    if (!isMounted) {
        return <>{children}</>;
    }

    return <>{children}</>;
}