import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner/partner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { merchantId, user, rating, review, userId } = await request.json();

        if (!merchantId || !user || !rating || !userId) {
            return NextResponse.json(
                { error: "Missing required fields: merchantId, user, rating, userId" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        const merchant = await Partner.findOne({ merchantId });

        if (!merchant) {
            return NextResponse.json(
                { error: "Merchant not found" },
                { status: 404 }
            );
        }

        const existingReviewIndex = merchant.ratings.findIndex((r: any) => r.userId === userId);
        if (existingReviewIndex !== -1) {
            return NextResponse.json(
                { error: "You have already posted a review for this merchant. Please edit or delete your existing review." },
                { status: 409 }
            );
        }

        const newReview = {
            userId,
            user,
            rating,
            review: review || "",
            createdAt: new Date(),
        };

        merchant.ratings.push(newReview);

        const averageRating = merchant.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / merchant.ratings.length;
        merchant.averageRating = parseFloat(averageRating.toFixed(2));

        await merchant.save();

        return NextResponse.json(
            {
                message: "Review added successfully",
                merchant,
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json(
            { error: "Failed to add review", details: err.message },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();

        const { merchantId, userId, rating, review } = await request.json();

        if (!merchantId || !userId || !rating) {
            return NextResponse.json(
                { error: "Missing required fields: merchantId, userId, rating" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        const merchant = await Partner.findOne({ merchantId });

        if (!merchant) {
            return NextResponse.json(
                { error: "Merchant not found" },
                { status: 404 }
            );
        }

        const reviewIndex = merchant.ratings.findIndex((r: any) => r.userId === userId);
        if (reviewIndex === -1) {
            return NextResponse.json(
                { error: "Review not found" },
                { status: 404 }
            );
        }

        merchant.ratings[reviewIndex].rating = rating;
        merchant.ratings[reviewIndex].review = review || "";
        merchant.ratings[reviewIndex].createdAt = new Date();

        const averageRating = merchant.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / merchant.ratings.length;
        merchant.averageRating = parseFloat(averageRating.toFixed(2));

        await merchant.save();

        return NextResponse.json(
            {
                message: "Review updated successfully",
                merchant,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json(
            { error: "Failed to update review", details: err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();

        const { merchantId, userId } = await request.json();

        if (!merchantId || !userId) {
            return NextResponse.json(
                { error: "Missing required fields: merchantId, userId" },
                { status: 400 }
            );
        }

        const merchant = await Partner.findOne({ merchantId });

        if (!merchant) {
            return NextResponse.json(
                { error: "Merchant not found" },
                { status: 404 }
            );
        }

        const reviewIndex = merchant.ratings.findIndex((r: any) => r.userId === userId);
        if (reviewIndex === -1) {
            return NextResponse.json(
                { error: "Review not found" },
                { status: 404 }
            );
        }

        merchant.ratings.splice(reviewIndex, 1);

        if (merchant.ratings.length > 0) {
            const averageRating = merchant.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / merchant.ratings.length;
            merchant.averageRating = parseFloat(averageRating.toFixed(2));
        } else {
            merchant.averageRating = 0;
        }

        await merchant.save();

        return NextResponse.json(
            {
                message: "Review deleted successfully",
                merchant,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json(
            { error: "Failed to delete review", details: err.message },
            { status: 500 }
        );
    }
}
