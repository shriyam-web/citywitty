'use client';

import Script from 'next/script';

interface MerchantsStructuredDataProps {
    merchantCount: number;
    baseUrl?: string;
}

export function MerchantsStructuredData({
    merchantCount,
    baseUrl = 'https://citywitty.com'
}: MerchantsStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'All Merchants - CityWitty',
        description: 'Browse all CityWitty partner merchants offering exclusive discounts and deals',
        url: `${baseUrl}/merchants`,
        mainEntity: {
            '@type': 'ItemList',
            name: 'CityWitty Merchants',
            numberOfItems: merchantCount,
            itemListElement: []
        },
        breadcrumb: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: baseUrl
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Merchants',
                    item: `${baseUrl}/merchants`
                }
            ]
        },
        isPartOf: {
            '@type': 'Website',
            name: 'CityWitty',
            url: baseUrl,
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${baseUrl}/merchants?search={search_term_string}`
                }
            }
        }
    };

    return (
        <Script
            id="merchants-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData, null, 2)
            }}
            strategy="afterInteractive"
        />
    );
}