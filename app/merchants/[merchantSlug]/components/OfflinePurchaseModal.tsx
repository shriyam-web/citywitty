import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndianRupee, Tag, TrendingDown } from 'lucide-react';
import {
    FaDumbbell,
    FaGift,
    FaPalette,
    FaGraduationCap,
    FaShoppingBag,
} from "react-icons/fa";

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
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [finalAmount, setFinalAmount] = useState('');

    const calculateDiscount = (): string => {
        const purchase = parseFloat(purchaseAmount) || 0;
        const final = parseFloat(finalAmount) || 0;
        const discount = purchase - final;
        return discount > 0 ? discount.toFixed(2) : '0.00';
    };

    const handleSubmit = async () => {
        console.log({
            userId,
            userName,
            purchaseAmount,
            finalAmount,
            discountApplied: calculateDiscount(),
            merchantId,
            merchantSlug
        });

        // Reset form and close modal
        setUserId('');
        setUserName('');
        setPurchaseAmount('');
        setFinalAmount('');
        onClose();

        // Show success message (you can add a toast notification here)
        alert('Purchase recorded successfully!');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 px-6 py-5 relative overflow-hidden">
                    {/* Background Icons */}
                    <FaShoppingBag
                        className="absolute text-slate-400"
                        style={{
                            top: '8%',
                            left: '25%',
                            fontSize: '130px',
                            opacity: 0.22,
                            transform: 'rotate(32deg)',
                        }}
                    />
                    <FaDumbbell
                        className="absolute text-slate-400"
                        style={{
                            top: '5%',
                            left: '50%',
                            fontSize: '145px',
                            opacity: 0.19,
                            transform: 'rotate(-28deg)',
                        }}
                    />
                    <FaGift
                        className="absolute text-slate-400"
                        style={{
                            top: '10%',
                            right: '30%',
                            fontSize: '135px',
                            opacity: 0.18,
                            transform: 'rotate(25deg)',
                        }}
                    />
                    <FaPalette
                        className="absolute text-slate-400"
                        style={{
                            top: '35%',
                            left: '20%',
                            fontSize: '148px',
                            opacity: 0.20,
                            transform: 'rotate(-15deg)',
                        }}
                    />
                    <FaGraduationCap
                        className="absolute text-slate-400"
                        style={{
                            top: '50%',
                            left: '48%',
                            fontSize: '190px',
                            opacity: 0.16,
                            transform: 'rotate(18deg)',
                        }}
                    />

                    <DialogHeader className="relative z-10">
                        <DialogTitle className="text-2xl font-bold text-white">Record Your Purchase</DialogTitle>
                        <DialogDescription className="text-indigo-100">
                            Track your offline purchase and get rewarded with cashback!
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="userId" className="text-sm font-semibold text-slate-700">User ID</Label>
                        <Input
                            id="userId"
                            placeholder="Enter your CityWitty User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="rounded-xl border-slate-300 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="userName" className="text-sm font-semibold text-slate-700">Name</Label>
                        <Input
                            id="userName"
                            placeholder="Enter your full name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="rounded-xl border-slate-300 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="purchaseAmount" className="text-sm font-semibold text-slate-700">Purchase Amount</Label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                id="purchaseAmount"
                                type="number"
                                placeholder="0.00"
                                value={purchaseAmount}
                                onChange={(e) => setPurchaseAmount(e.target.value)}
                                className="rounded-xl border-slate-300 focus:border-indigo-500 pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="finalAmount" className="text-sm font-semibold text-slate-700">Final Amount (After Discount)</Label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                id="finalAmount"
                                type="number"
                                placeholder="0.00"
                                value={finalAmount}
                                onChange={(e) => setFinalAmount(e.target.value)}
                                className="rounded-xl border-slate-300 focus:border-indigo-500 pl-10"
                            />
                        </div>
                    </div>

                    {purchaseAmount && finalAmount && parseFloat(calculateDiscount()) > 0 && (
                        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                            <div className="flex items-center gap-2 text-emerald-700">
                                <TrendingDown className="h-5 w-5" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider">Discount Applied</p>
                                    <p className="text-2xl font-bold">₹{calculateDiscount()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <DialogFooter className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!userId || !userName || !purchaseAmount || !finalAmount}
                        className="rounded-full bg-indigo-600 hover:bg-indigo-700"
                    >
                        Submit Purchase
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};