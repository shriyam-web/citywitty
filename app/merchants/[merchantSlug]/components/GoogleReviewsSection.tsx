import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

interface GoogleReviewsSectionProps {
  googleReviews?: {
    rating: number;
    userRatingsTotal: number;
    reviews: any[];
    lastFetched: Date;
  };
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ googleReviews }) => {
  if (!googleReviews || !googleReviews.userRatingsTotal || !googleReviews.rating || googleReviews.userRatingsTotal === 0) {
    return null;
  }

  const { rating, userRatingsTotal } = googleReviews;

  return (
    <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <FaGoogle className="h-5 w-5 text-[#4285F4]" />
          <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Google Reviews
          </CardTitle>
        </div>
        <p className="text-xs font-medium text-slate-500 sm:text-sm">
          Real customer reviews from Google
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Rating Score */}
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-slate-900">{rating.toFixed(1)}</div>
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < rating
                        ? 'fill-amber-200 text-amber-200'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {userRatingsTotal.toLocaleString()} review{userRatingsTotal !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Divider */}
          <div className="h-24 w-px bg-slate-200"></div>

          {/* Stats */}
          <div className="flex-1 space-y-2">
            <div className="text-sm text-slate-600">
              Based on <span className="font-semibold text-slate-900">{userRatingsTotal.toLocaleString()}</span> Google reviews
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                <span>Verified Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Google Badge */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Powered by Google</span>
            <FaGoogle className="h-4 w-4 text-[#4285F4]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};