import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import type { Merchant } from '../types';

interface BusinessHoursSectionProps {
    merchant: Merchant;
    isOpenAllWeek: boolean;
    orderedBusinessDays: string[];
    openingTime: string;
    closingTime: string;
}

export const BusinessHoursSection: React.FC<BusinessHoursSectionProps> = ({
    merchant,
    isOpenAllWeek,
    orderedBusinessDays,
    openingTime,
    closingTime
}) => {
    if (!merchant.businessHours) return null;

    return (
        <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Business Hours</CardTitle>
                <p className="text-xs font-medium text-slate-500 sm:text-sm">Plan your visit with confidence.</p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5">
                {isOpenAllWeek ? (
                    <div className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 p-4 sm:p-6 lg:p-7">
                        <div className="absolute inset-y-0 right-0 hidden w-24 rounded-l-full bg-emerald-500/15 sm:block"></div>
                        <div className="relative flex flex-col gap-3 sm:gap-4 text-emerald-700">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white/70 shadow-sm flex-shrink-0">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                </span>
                                <div>
                                    <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500/80">Always On</div>
                                    <div className="text-lg sm:text-2xl font-semibold text-emerald-700">Open All Days</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
                                <span className="rounded-full bg-white/80 px-2 sm:px-3 py-1 text-emerald-700">{openingTime} - {closingTime}</span>
                                <span className="rounded-full bg-white/80 px-2 sm:px-3 py-1 text-emerald-700">Every day</span>
                            </div>
                            <p className="text-xs sm:text-sm text-emerald-600/90">Drop in any day you like&mdash;the team is ready to welcome you throughout the week.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3 text-slate-600">
                            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                            <span className="text-sm sm:text-base font-semibold text-slate-900">{openingTime} - {closingTime}</span>
                        </div>
                        <div className="grid gap-2 text-xs sm:text-sm text-slate-600 sm:grid-cols-2">
                            {orderedBusinessDays.map((day) => (
                                <div
                                    key={day}
                                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3"
                                >
                                    <span className="font-medium text-slate-700">{day}</span>
                                    <span className="text-xs sm:text-sm font-medium text-slate-500">{openingTime} - {closingTime}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};