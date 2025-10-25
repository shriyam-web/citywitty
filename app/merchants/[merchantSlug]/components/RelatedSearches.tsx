import React from 'react';
import Link from 'next/link';

interface RelatedSearchesProps {
    tags: string[];
}

export const RelatedSearches: React.FC<RelatedSearchesProps> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="w-full border-t border-gray-200 bg-white">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 py-3 leading-tight px-6 sm:px-12 lg:px-24">
                <span className="font-medium text-gray-800 whitespace-nowrap">Related Searches:</span>
                {tags.map((tag, index) => (
                    <React.Fragment key={index}>
                        <Link
                            href={`/merchants?search=${encodeURIComponent(tag)}`}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            {tag
                                .toLowerCase()
                                .replace(/\b\w/g, char => char.toUpperCase())}
                        </Link>
                        {index < tags.length - 1 && <span className="text-gray-300">|</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};