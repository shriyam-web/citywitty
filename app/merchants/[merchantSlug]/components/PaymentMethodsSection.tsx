import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentMethodsSectionProps {
    paymentMethods: string[];
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({ paymentMethods }) => {
    if (!paymentMethods || paymentMethods.length === 0) return null;

    return (
        <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Payment Methods</CardTitle>
                <p className="text-xs font-medium text-slate-500 sm:text-sm">Multiple options to make transactions seamless.</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {paymentMethods.map((method, index) => (
                        <span key={index} className="rounded-full bg-indigo-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            {method}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};