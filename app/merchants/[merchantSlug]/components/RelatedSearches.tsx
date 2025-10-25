import React from 'react';
import Link from 'next/link';

interface RelatedSearchesProps {
    tags: string[];
}

export const RelatedSearches: React.FC<RelatedSearchesProps> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="bg-gray-50 py-8 sm:py-12 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-700">
                        <span className="font-semibold text-gray-900">Related Searches:</span>{' '}
                        {tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <Link
                                    href={`/merchants?search=${encodeURIComponent(tag)}`}
                                    className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                                >
                                    {tag}
                                </Link>
                                {index < tags.length - 1 && <span className="text-gray-400 mx-2">|</span>}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
};