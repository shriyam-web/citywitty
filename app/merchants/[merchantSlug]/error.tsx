'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Something went wrong!
                    </h2>
                    <p className="text-gray-600 mb-8">
                        We encountered an error while loading the merchant profile. Please try again.
                    </p>
                    <div className="space-y-4">
                        <Button onClick={reset} className="w-full">
                            Try Again
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/merchants">Back to Merchants</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
