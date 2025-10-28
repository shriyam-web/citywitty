'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IndianRupee, Tag, TrendingDown, Phone, LogIn, CheckCircle2, Clock, User } from 'lucide-react';
import {
    FaDumbbell,
    FaGift,
    FaPalette,
    FaGraduationCap,
    FaShoppingBag,
} from "react-icons/fa";
import { useAuth } from '@/lib/auth-context';

interface OfflinePurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    merchantId: string;
    merchantSlug: string;
}

export const OfflinePurchaseModal: React.FC<OfflinePurchaseModalProps> = ({
    isOpen,
    onClose,
    merchantId,
    merchantSlug
}) => {
    const router = useRouter();
    const { user } = useAuth();
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userMobileNo, setUserMobileNo] = useState('');
    const [productPurchased, setProductPurchased] = useState('');
    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [finalAmount, setFinalAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [amountError, setAmountError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedDiscount, setSubmittedDiscount] = useState('');

    // Auto-fill user data when modal opens and user is logged in
    useEffect(() => {
        if (isOpen && user) {
            // Fetch full user data to get userId, mobile number, etc.
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`/api/user-exists`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.user) {
                            // Set userId from database (CW-U******), not MongoDB _id
                            setUserId(data.user.userId || '');
                            setUserName(data.user.name || user.name || '');
                            if (data.user.mobile || data.user.whatsapp) {
                                setUserMobileNo(data.user.mobile || data.user.whatsapp || '');
                            }
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    // Fallback to context user data
                    setUserName(user.name || '');
                }
            };

            fetchUserData();
        }
    }, [isOpen, user]);

    // Validate amounts whenever they change
    useEffect(() => {
        if (purchaseAmount || finalAmount) {
            const purchase = parseFloat(purchaseAmount);
            const final = parseFloat(finalAmount);

            if (purchaseAmount && purchase < 0) {
                setAmountError('Purchase amount cannot be negative');
            } else if (finalAmount && final < 0) {
                setAmountError('Final amount cannot be negative');
            } else if (purchaseAmount && finalAmount && final >= purchase) {
                setAmountError('Final amount must be less than purchase amount');
            } else {
                setAmountError('');
            }
        } else {
            setAmountError('');
        }
    }, [purchaseAmount, finalAmount]);

    const calculateDiscount = (): string => {
        const purchase = parseFloat(purchaseAmount) || 0;
        const final = parseFloat(finalAmount) || 0;
        const discount = purchase - final;
        return discount > 0 ? discount.toFixed(2) : '0.00';
    };

    const handleSubmit = async () => {
        // Check if user is logged in
        if (!user) {
            router.push('/login');
            return;
        }

        if (isSubmitting) return;

        // Validate amounts
        const purchase = parseFloat(purchaseAmount);
        const final = parseFloat(finalAmount);

        if (purchase < 0 || final < 0) {
            alert('Amounts cannot be negative');
            return;
        }

        if (final >= purchase) {
            alert('Final amount must be less than purchase amount');
            return;
        }

        const payload = {
            userId: userId.trim(),
            userName: userName.trim(),
            userMobileNo: userMobileNo.trim(),
            productPurchased: productPurchased.trim(),
            merchantId,
            merchantSlug,
            purchaseAmount: purchase,
            finalAmount: final,
            discountApplied: parseFloat(calculateDiscount()),
        };

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/purchase-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => null);
                throw new Error(error?.error || 'Failed to record purchase');
            }

            // Store discount before clearing
            setSubmittedDiscount(calculateDiscount());

            // Clear form
            setUserId('');
            setUserName('');
            setUserMobileNo('');
            setProductPurchased('');
            setPurchaseAmount('');
            setFinalAmount('');

            // Show success modal
            setShowSuccess(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to record purchase';
            alert(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show success modal
    if (isOpen && showSuccess) {
        return (
            <Dialog open={isOpen} onOpenChange={(open) => {
                if (!open) {
                    setShowSuccess(false);
                    onClose();
                }
            }}>
                <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden max-h-[95vh] overflow-y-auto">
                    {/* Success Header with Animation */}
                    <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 px-4 py-6 sm:px-6 sm:py-8 text-center relative overflow-hidden">
                        {/* Animated Background Circles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-x-12 -translate-y-12 sm:-translate-x-16 sm:-translate-y-16 animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full translate-x-16 translate-y-16 sm:translate-x-20 sm:translate-y-20 animate-pulse delay-150"></div>
                            <div className="absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full -translate-x-10 -translate-y-10 sm:-translate-x-12 sm:-translate-y-12 animate-pulse delay-300"></div>
                        </div>

                        {/* Success Icon */}
                        <div className="relative z-10 mb-3 sm:mb-4">
                            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600" strokeWidth={2.5} />
                            </div>
                        </div>

                        <DialogHeader className="relative z-10">
                            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                                Transaction Recorded! 🎉
                            </DialogTitle>
                            <DialogDescription className="text-emerald-50 text-sm sm:text-base">
                                Your purchase has been successfully submitted
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Success Content */}
                    <div className="px-4 py-4 sm:px-6 sm:py-6 space-y-3 sm:space-y-4">
                        {/* Discount Highlight */}
                        {submittedDiscount && parseFloat(submittedDiscount) > 0 && (
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-3 sm:p-4 text-center">
                                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                                    Expected Cashback
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                                    ₹{submittedDiscount}
                                </p>
                            </div>
                        )}

                        {/* Status Information */}
                        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5 sm:mb-1">
                                        Pending Merchant Approval
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Your transaction is awaiting verification by the merchant. They will review and approve it from their dashboard.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5 sm:mb-1">
                                        What's Next?
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Please request the merchant to approve your purchase. Once approved, your cashback will be credited to your account.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 sm:p-3">
                            <p className="text-xs text-blue-800 text-center leading-relaxed">
                                💡 <span className="font-semibold">Pro Tip:</span> You can track your transaction status from your dashboard
                            </p>
                        </div>
                    </div>

                    {/* Success Footer */}
                    <DialogFooter className="bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 border-t border-slate-200">
                        <Button
                            onClick={() => {
                                setShowSuccess(false);
                                onClose();
                            }}
                            className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold h-10 sm:h-11 text-sm sm:text-base shadow-lg"
                        >
                            Got it, Thanks! ✨
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    // Show login prompt if not authenticated
    if (isOpen && !user) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden">
                    <div className="bg-indigo-600 px-4 sm:px-6 py-6 sm:py-8 text-center relative">
                        <LogIn className="h-12 w-12 mx-auto mb-3 text-white" />
                        <DialogHeader>
                            <DialogTitle className="text-xl sm:text-2xl font-bold text-white">Login Required</DialogTitle>
                            <DialogDescription className="text-indigo-100 text-sm sm:text-base">
                                Please log in to record your purchase and earn cashback rewards.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <div className="p-4 sm:p-6">
                        <p className="text-slate-600 text-sm sm:text-base mb-4">
                            Track your offline purchases with CityWitty and get exclusive rewards!
                        </p>
                        <p className="text-slate-500 text-xs sm:text-sm mb-6">
                            Don't have an account? Create one for free and start earning cashback.
                        </p>
                    </div>
                    <DialogFooter className="bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="rounded-full text-sm sm:text-base"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onClose();
                                router.push('/login');
                            }}
                            className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-sm sm:text-base"
                        >
                            Go to Login
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] sm:max-w-[700px] p-0 overflow-hidden">
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 sm:px-6 py-3 relative overflow-hidden">
                    <DialogHeader className="relative z-10">
                        <DialogTitle className="text-lg sm:text-xl font-bold text-white">Record Purchase</DialogTitle>
                        <DialogDescription className="text-indigo-100 text-xs sm:text-sm">
                            Track your purchase & earn cashback
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Compact Content - Two Column Layout */}
                <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {/* User ID */}
                        <div className="space-y-1">
                            <Label htmlFor="userId" className="text-xs font-semibold text-slate-700">
                                User ID {user && <span className="text-indigo-600 font-normal">(auto-filled)</span>}
                            </Label>
                            <Input
                                id="userId"
                                placeholder="CW-U******"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                disabled={!!user}
                                className="h-9 rounded-lg text-sm border-slate-300 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-600"
                            />
                        </div>

                        {/* Name */}
                        <div className="space-y-1">
                            <Label htmlFor="userName" className="text-xs font-semibold text-slate-700">
                                Name {user && <span className="text-indigo-600 font-normal">(auto-filled)</span>}
                            </Label>
                            <Input
                                id="userName"
                                placeholder="Your full name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                disabled={!!user}
                                className="h-9 rounded-lg text-sm border-slate-300 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-600"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-1">
                            <Label htmlFor="userMobileNo" className="text-xs font-semibold text-slate-700">
                                Mobile {user && userMobileNo && <span className="text-indigo-600 font-normal">(auto-filled)</span>}
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                                <Input
                                    id="userMobileNo"
                                    type="tel"
                                    placeholder="Mobile number"
                                    value={userMobileNo}
                                    onChange={(e) => setUserMobileNo(e.target.value)}
                                    className="h-9 rounded-lg text-sm border-slate-300 focus:border-indigo-500 pl-9"
                                />
                            </div>
                        </div>

                        {/* Product Purchased - Full Width */}
                        <div className="space-y-1 sm:col-span-2">
                            <Label htmlFor="productPurchased" className="text-xs font-semibold text-slate-700">Product/Service</Label>
                            <Textarea
                                id="productPurchased"
                                placeholder="What did you purchase?"
                                value={productPurchased}
                                onChange={(e) => setProductPurchased(e.target.value)}
                                className="rounded-lg text-sm border-slate-300 focus:border-indigo-500 min-h-[60px] resize-none"
                            />
                        </div>

                        {/* Purchase Amount */}
                        <div className="space-y-1">
                            <Label htmlFor="purchaseAmount" className="text-xs font-semibold text-slate-700">Purchase Amount</Label>
                            <div className="relative">
                                <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                                <Input
                                    id="purchaseAmount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={purchaseAmount}
                                    onChange={(e) => setPurchaseAmount(e.target.value)}
                                    className="h-9 rounded-lg text-sm border-slate-300 focus:border-indigo-500 pl-9"
                                />
                            </div>
                        </div>

                        {/* Final Amount */}
                        <div className="space-y-1">
                            <Label htmlFor="finalAmount" className="text-xs font-semibold text-slate-700">Final Amount</Label>
                            <div className="relative">
                                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                                <Input
                                    id="finalAmount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={finalAmount}
                                    onChange={(e) => setFinalAmount(e.target.value)}
                                    className="h-9 rounded-lg text-sm border-slate-300 focus:border-indigo-500 pl-9"
                                />
                            </div>
                        </div>

                        {/* Error Message - Full Width */}
                        {amountError && (
                            <div className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 flex items-center gap-2">
                                <span className="font-semibold">⚠</span>
                                <span>{amountError}</span>
                            </div>
                        )}

                        {/* Discount Display - Full Width */}
                        {purchaseAmount && finalAmount && parseFloat(calculateDiscount()) > 0 && !amountError && (
                            <div className="sm:col-span-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-emerald-700">
                                    <TrendingDown className="h-4 w-4" />
                                    <span className="text-xs font-semibold">Discount Applied</span>
                                </div>
                                <span className="text-lg font-bold text-emerald-700">₹{calculateDiscount()}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Compact Footer */}
                <DialogFooter className="bg-slate-50 px-4 sm:px-5 py-2.5 border-t border-slate-200 flex flex-row gap-2 justify-end">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-full text-sm h-9 px-4"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !userId || !userName || !userMobileNo || !productPurchased || !purchaseAmount || !finalAmount || !!amountError}
                        className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-sm h-9 px-4"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};