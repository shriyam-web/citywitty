import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Sparkles } from 'lucide-react';
import type { MerchantProduct } from '../types';

interface ProductsSectionProps {
    products: MerchantProduct[];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
    if (!products || products.length === 0) return null;

    const formatCurrency = (value?: number | null) => {
        if (value === undefined || value === null) {
            return null;
        }
        return value.toLocaleString('en-IN');
    };

    return (
        <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Signature Offerings</CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Curated products that customers love the most.</p>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product, index) => {
                        const productKey = product._id ?? product.productId ?? index;
                        const productImages = product.productImages ?? [];
                        const firstImage = productImages[0];
                        const isOutOfStock = product.isAvailableStock === false || product.availableStocks === 0;
                        const displayPrice = product.discountedPrice ?? product.originalPrice ?? null;
                        const originalPrice = product.originalPrice ?? null;
                        const hasDiscount =
                            product.discountedPrice !== undefined &&
                            product.discountedPrice !== null &&
                            originalPrice !== null &&
                            product.discountedPrice < originalPrice;
                        const formattedDisplayPrice = formatCurrency(displayPrice);
                        const formattedOriginalPrice = formatCurrency(originalPrice);

                        return (
                            <div key={productKey} className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                                {firstImage ? (
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={firstImage}
                                            alt={product.productName ?? `Product ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                        {isOutOfStock && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                                Out of Stock
                                            </div>
                                        )}
                                        {product.cityWittyAssured && (
                                            <Badge className="absolute left-3 top-3 rounded-full bg-emerald-500/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-sm">
                                                Assured
                                            </Badge>
                                        )}
                                        {product.sponsored && (
                                            <div className="absolute top-2 right-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-semibold text-white">
                                                Sponsored
                                            </div>
                                        )}
                                        {product.isPriority && (
                                            <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-2 py-1 text-xs font-semibold text-white">
                                                <Flame className="h-3 w-3" />
                                                Hot
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex h-44 w-full items-center justify-center bg-slate-100 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                                        No Image
                                    </div>
                                )}
                                <div className="flex flex-1 flex-col gap-4 p-5">
                                    <div className="space-y-2">
                                        <h5 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900">
                                            {product.productName ?? `Product ${index + 1}`}
                                        </h5>
                                        {product.brand && (
                                            <p className="text-xs font-medium text-slate-500">
                                                Brand: <span className="text-slate-700">{product.brand}</span>
                                            </p>
                                        )}
                                        {product.productDescription && (
                                            <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                                                {product.productDescription}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-auto space-y-3">
                                        {formattedDisplayPrice && (
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-bold text-indigo-600">₹{formattedDisplayPrice}</span>
                                                {hasDiscount && formattedOriginalPrice && (
                                                    <span className="text-sm font-medium text-slate-400 line-through">₹{formattedOriginalPrice}</span>
                                                )}
                                            </div>
                                        )}
                                        {product.cashbackPoints && (
                                            <div className="text-xs font-semibold text-green-600">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                                                    <Sparkles className="h-3 w-3" />
                                                    {product.cashbackPoints} points
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};