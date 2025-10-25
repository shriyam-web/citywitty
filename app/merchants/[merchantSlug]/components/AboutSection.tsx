import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Merchant } from '../types';

interface AboutSectionProps {
    merchant: Merchant;
    descriptionParagraphs: string[];
    aboutStats: Array<{ label: string; caption: string }>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
    merchant,
    descriptionParagraphs,
    aboutStats
}) => {
    if (descriptionParagraphs.length === 0) return null;

    return (
        <Card className="mt-6 border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">About</CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{merchant.displayName} – Your partner in exceptional experiences</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {descriptionParagraphs.map((para, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-slate-600">
                        {para}
                    </p>
                ))}
                {aboutStats.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                        {aboutStats.map((stat, idx) => (
                            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-3 sm:py-4 text-center">
                                <p className="text-lg sm:text-xl font-bold text-indigo-600">{stat.label}</p>
                                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">{stat.caption}</p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};