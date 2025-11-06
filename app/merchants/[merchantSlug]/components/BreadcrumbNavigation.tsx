/**
 * BreadcrumbNavigation Component
 * Server-side rendered breadcrumbs for SEO and UX
 * Helps with navigation clarity and improves SERP appearance
 */

import Link from 'next/link';
import type { Merchant } from '../types';

interface BreadcrumbNavigationProps {
    merchant: Merchant;
}

export function BreadcrumbNavigation({ merchant }: BreadcrumbNavigationProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Merchants', url: '/merchants' },
        { name: merchant.city || 'Local Area', url: `/merchants?city=${encodeURIComponent(merchant.city || 'local')}` },
        { name: merchant.displayName, url: null, current: true },
    ];

    return (
        <nav
            className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600"
            aria-label="Breadcrumb"
        >
            {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                    {crumb.current ? (
                        <span className="text-slate-900 font-semibold">{crumb.name}</span>
                    ) : (
                        <>
                            <Link
                                href={crumb.url!}
                                className="hover:text-slate-900 transition-colors hover:underline"
                            >
                                {crumb.name}
                            </Link>
                            {index < breadcrumbs.length - 1 && (
                                <svg
                                    className="h-3 w-3 text-slate-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 7.75a1 1 0 11 1.414-1.414l4.828 4.828a1 1 0 010 1.414l-4.828 4.828a1 1 0 11-1.414-1.414L9.172 10 5.555 7.75z" />
                                </svg>
                            )}
                        </>
                    )}
                </div>
            ))}
        </nav>
    );
}