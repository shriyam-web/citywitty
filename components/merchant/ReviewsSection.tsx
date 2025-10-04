'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ThumbsUp, ThumbsDown, Filter } from 'lucide-react';

interface Review {
    userId: string;
    user: string;
    rating: number;
    review?: string;
    reply?: string;
    createdAt?: Date;
}

interface ReviewsSectionProps {
    reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');

    const sortedAndFilteredReviews = useMemo(() => {
        let filtered = reviews;

        // Filter by rating
        if (filterRating !== 'all') {
            filtered = filtered.filter(review => review.rating === filterRating);
        }

        // Sort reviews
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                case 'oldest':
                    return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
                case 'highest':
                    return b.rating - a.rating;
                case 'lowest':
                    return a.rating - b.rating;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [reviews, sortBy, filterRating]);

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
    }));

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Customer Reviews ({reviews.length})</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                            <SelectTrigger className="w-full sm:w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="highest">Highest</SelectItem>
                                <SelectItem value="lowest">Lowest</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterRating.toString()} onValueChange={(value) => setFilterRating(value === 'all' ? 'all' : parseInt(value))}>
                            <SelectTrigger className="w-full sm:w-32">
                                <SelectValue placeholder="Filter by rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Ratings</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {reviews.length > 0 && (
                    <div className="flex items-center space-x-4 mt-4">
                        <div className="flex items-center space-x-2">
                            <Star className="h-6 w-6 text-yellow-400 fill-current" />
                            <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-600">out of 5</span>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                            {reviews.length} reviews
                        </Badge>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {reviews.length > 0 ? (
                    <>
                        {/* Rating Breakdown */}
                        <div className="mb-8">
                            <h4 className="font-semibold mb-4 text-lg">Rating Breakdown</h4>
                            <div className="space-y-3">
                                {ratingCounts.map(({ star, count, percentage }) => (
                                    <div key={star} className="flex items-center space-x-4">
                                        <span className="text-sm font-medium w-12">{star} ★</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-12">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Individual Reviews */}
                        <div className="space-y-6">
                            {sortedAndFilteredReviews.map((rating, index) => (
                                <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-semibold text-lg">{rating.user}</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                <span className="text-lg font-medium">{rating.rating}</span>
                                            </div>
                                            {rating.createdAt && (
                                                <span className="text-sm text-gray-500">
                                                    {new Date(rating.createdAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {rating.review && <p className="text-gray-700 mb-3 leading-relaxed">{rating.review}</p>}
                                    {rating.reply && (
                                        <div className="mt-4 pl-6 border-l-4 border-blue-200 bg-blue-50 p-4 rounded-r-lg">
                                            <p className="text-sm text-gray-600"><strong className="text-blue-600">Merchant Reply:</strong> {rating.reply}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to leave a review!</p>
                )}
            </CardContent>
        </Card>
    );
}
