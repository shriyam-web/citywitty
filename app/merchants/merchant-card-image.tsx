'use client';

import React from 'react';
import { Building2, Utensils, Hotel, ShoppingBag, Scissors, Gamepad2 } from 'lucide-react';

interface MerchantCardImageProps {
    logo?: string;
    displayName: string;
    category: string;
}

function getCategoryIcon(category: string) {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('restaurant') || lowerCategory.includes('food') || lowerCategory.includes('cafe')) {
        return Utensils;
    }
    if (lowerCategory.includes('hotel') || lowerCategory.includes('resort') || lowerCategory.includes('stay')) {
        return Hotel;
    }
    if (lowerCategory.includes('shopping') || lowerCategory.includes('store') || lowerCategory.includes('mall')) {
        return ShoppingBag;
    }
    if (lowerCategory.includes('salon') || lowerCategory.includes('spa') || lowerCategory.includes('beauty')) {
        return Scissors;
    }
    if (lowerCategory.includes('entertainment') || lowerCategory.includes('game') || lowerCategory.includes('movie')) {
        return Gamepad2;
    }
    return Building2;
}

export function MerchantCardImage({ logo, displayName, category }: MerchantCardImageProps) {
    const Icon = getCategoryIcon(category);
    const [showFallback, setShowFallback] = React.useState(!logo);
    
    return (
        <>
            {showFallback && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-gray-400" />
                </div>
            )}
            {logo && (
                <img
                    src={logo}
                    alt={`${displayName} - ${category}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onLoad={() => setShowFallback(false)}
                    onError={() => setShowFallback(true)}
                />
            )}
        </>
    );
}
