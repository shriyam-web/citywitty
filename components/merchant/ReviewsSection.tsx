'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, ThumbsDown, Filter, Plus, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

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
    merchantId?: string;
}

export function ReviewsSection({ reviews, merchantId }: ReviewsSectionProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [userName, setUserName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [allReviews, setAllReviews] = useState<Review[]>(reviews);
    const userReview = user ? allReviews.find(r => r.userId === user.id) : null;

    useEffect(() => {
        setAllReviews(reviews);
    }, [reviews]);

    useEffect(() => {
        if (isDialogOpen) {
            if (isEditing && userReview) {
                setSelectedRating(userReview.rating);
                setReviewText(userReview.review || '');
                setUserName(userReview.user);
            } else {
                if (user?.name) {
                    setUserName(user.name);
                }
                setSelectedRating(5);
                setReviewText('');
            }
        }
    }, [isDialogOpen, isEditing, userReview, user?.name]);

    const sortedAndFilteredReviews = useMemo(() => {
        let filtered = allReviews;

        if (filterRating !== 'all') {
            filtered = filtered.filter(review => review.rating === filterRating);
        }

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
    }, [allReviews, sortBy, filterRating]);

    const averageRating = allReviews.length > 0
        ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
        : 0;

    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: allReviews.filter(r => r.rating === star).length,
        percentage: allReviews.length > 0 ? (allReviews.filter(r => r.rating === star).length / allReviews.length) * 100 : 0
    }));

    const handleOpenReviewDialog = () => {
        if (!user) {
            setIsLoginPromptOpen(true);
            return;
        }
        if (userReview) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSubmitReview = async () => {
        if (!userName.trim()) {
            alert('Please enter your name');
            return;
        }

        setIsSubmitting(true);
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const response = await fetch('/api/reviews', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    merchantId,
                    user: userName,
                    rating: selectedRating,
                    review: reviewText,
                    userId: user?.id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAllReviews(data.merchant.ratings || []);
                setIsDialogOpen(false);
                setIsEditing(false);
                setUserName('');
                setReviewText('');
                setSelectedRating(5);
                alert(isEditing ? 'Review updated successfully!' : 'Review posted successfully!');
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditReview = () => {
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleDeleteReview = async () => {
        if (!confirm('Are you sure you want to delete your review?')) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/reviews', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    merchantId,
                    userId: user?.id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAllReviews(data.merchant.ratings || []);
                alert('Review deleted successfully!');
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Customer Reviews ({reviews.length})</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button 
                            onClick={handleOpenReviewDialog}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold uppercase tracking-wider"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Add Review</span>
                            <span className="sm:hidden">Review</span>
                        </Button>
                        
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{isEditing ? 'Edit Your Review' : 'Write a Review'}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                            disabled={!!user}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setSelectedRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`h-8 w-8 ${
                                                            star <= selectedRating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Review (Optional)</label>
                                        <Textarea
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            placeholder="Share your experience with this merchant..."
                                            className="w-full min-h-24 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleSubmitReview}
                                            disabled={isSubmitting}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
                                        >
                                            {isSubmitting ? (isEditing ? 'Updating...' : 'Submitting...') : (isEditing ? 'Update Review' : 'Submit Review')}
                                        </Button>
                                        {isEditing && (
                                            <Button
                                                onClick={handleDeleteReview}
                                                disabled={isSubmitting}
                                                variant="destructive"
                                                className="rounded-lg"
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isLoginPromptOpen} onOpenChange={setIsLoginPromptOpen}>
                            <DialogContent className="max-w-sm">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-xl">Share Your Experience! ✨</DialogTitle>
                                </DialogHeader>
                                <div className="text-center space-y-4">
                                    <LogIn className="h-12 w-12 mx-auto text-indigo-600" />
                                    <p className="text-gray-700">
                                        Join our community and share your honest review! You need to be logged in to share your thoughts with other customers.
                                    </p>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => setIsLoginPromptOpen(false)}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => router.push('/login')}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                                        >
                                            Login Now
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-lg">{rating.user}</span>
                                            {user?.id === rating.userId && (
                                                <Badge variant="secondary" className="text-xs">You</Badge>
                                            )}
                                        </div>
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
                                    {user?.id === rating.userId && (
                                        <div className="flex gap-2 mb-3">
                                            <Button
                                                onClick={handleEditReview}
                                                variant="outline"
                                                size="sm"
                                                className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={handleDeleteReview}
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
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
