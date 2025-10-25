import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQSectionProps {
    faqs: Array<{ question: string; answer: string }>;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
    if (!faqs || faqs.length === 0) return null;

    return (
        <Card className="border-0 bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 shadow-xl ring-1 ring-slate-200/40">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Frequently Asked</CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Quick answers that help you choose faster.</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-2xl border border-white/60 bg-white px-4 py-4 shadow-sm">
                            <div className="text-sm font-semibold text-slate-900">{faq.question}</div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};