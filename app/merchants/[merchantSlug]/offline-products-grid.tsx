'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

export function OfflineProductsGrid({ products }: { products: any[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => {
                const productKey = product._id ?? product.offlineProductId ?? index;
                const productImages = product.imageUrls ?? [];
                const firstImage = productImages[0];
                const isOutOfStock = product.status === 'out_of_stock' || product.availableStock === 0;
                const displayPrice = product.offerPrice ?? product.price ?? null;
                const originalPrice = product.price ?? null;
                const hasDiscount =
                    product.offerPrice !== undefined &&
                    product.offerPrice !== null &&
                    originalPrice !== null &&
                    product.offerPrice < originalPrice;

                const formatCurrency = (value?: number | null) => {
                    if (value === undefined || value === null) return null;
                    return value.toLocaleString('en-IN');
                };

                const formattedDisplayPrice = formatCurrency(displayPrice);
                const formattedOriginalPrice = formatCurrency(originalPrice);

                const [showFallback, setShowFallback] = React.useState(!firstImage);

                return (
                    <div key={productKey} className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative h-44 overflow-hidden">
                            {firstImage && (
                                <img
                                    src={firstImage}
                                    alt={product.productName ?? `Product ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onLoad={() => setShowFallback(false)}
                                    onError={() => setShowFallback(true)}
                                />
                            )}
                            {showFallback && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                                    No Image
                                </div>
                            )}
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                    Out of Stock
                                </div>
                            )}
                            <Badge className="absolute left-3 top-3 rounded-full bg-indigo-600/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-sm">
                                In-Store
                            </Badge>
                        </div>
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
                                {product.description && (
                                    <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                                        {product.description}
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
                                <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                                    Visit store to purchase
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
