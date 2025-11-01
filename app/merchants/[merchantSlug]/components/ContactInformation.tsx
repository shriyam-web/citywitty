import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import type { Merchant } from '../types';

interface ContactInformationProps {
    merchant: Merchant;
    ensureHttps: (url: string | undefined) => string;
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
    merchant,
    ensureHttps
}) => {
    return (
        <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Stay Connected</CardTitle>
                <p className="text-xs font-medium text-slate-500 sm:text-sm">Your go-to contact details.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    {merchant.phone && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 shadow-sm">
                            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Contact</div>
                            <div className="mt-3 space-y-2">
                                <a href={`tel:${merchant.phone}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-600 transition-colors">
                                    <Phone className="h-4 w-4" />
                                    <span>{merchant.phone}</span>
                                </a>
                                {merchant.email && (
                                    <a href={`mailto:${merchant.email}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-600 transition-colors">
                                        <Mail className="h-4 w-4" />
                                        <span className="truncate">{merchant.email}</span>
                                    </a>
                                )}
                                {merchant.website && (
                                    <a
                                        href={ensureHttps(merchant.website)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-600 transition-colors"
                                    >
                                        <Globe className="h-4 w-4" />
                                        <span className="truncate">{merchant.website}</span>
                                    </a>
                                )}
                                {merchant.whatsapp && (
                                    <a
                                        href={`https://wa.me/${merchant.whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-slate-700 hover:text-green-600 transition-colors"
                                    >
                                        <SiWhatsapp className="h-4 w-4" />
                                        <span>{merchant.whatsapp}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                    {merchant.streetAddress && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 shadow-sm">
                            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Address</div>
                            <div className="mt-3 flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-indigo-600" />
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {merchant.streetAddress}
                                    {merchant.city && `, ${merchant.city}`}
                                </p>
                            </div>
                        </div>
                    )}
                    {merchant.socialLinks && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 shadow-sm">
                            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Social Presence</div>
                            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                                {merchant.socialLinks.facebook && (
                                    <a href={ensureHttps(merchant.socialLinks.facebook)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-indigo-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg>
                                        <span className="hidden sm:inline">Facebook</span>
                                    </a>
                                )}
                                {merchant.socialLinks.instagram && (
                                    <a href={ensureHttps(merchant.socialLinks.instagram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-rose-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-rose-600 hover:bg-rose-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" /></svg>
                                        <span className="hidden sm:inline">Instagram</span>
                                    </a>
                                )}
                                {merchant.socialLinks.youtube && (
                                    <a href={ensureHttps(merchant.socialLinks.youtube)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-red-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-600 hover:bg-red-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                        <span className="hidden sm:inline">YouTube</span>
                                    </a>
                                )}
                                {merchant.socialLinks.twitter && (
                                    <a href={ensureHttps(merchant.socialLinks.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-sky-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 hover:bg-sky-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                                        <span className="hidden sm:inline">Twitter</span>
                                    </a>
                                )}
                                {merchant.socialLinks.linkedin && (
                                    <a href={ensureHttps(merchant.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" /></svg>
                                        <span className="hidden sm:inline">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <Button className="w-full rounded-full bg-indigo-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white hover:bg-indigo-700" asChild>
                    <a href={`https://wa.me/${merchant.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        Contact on WhatsApp
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
};