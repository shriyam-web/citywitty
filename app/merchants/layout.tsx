// app/merchants/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Partner Merchants - CityWitty | Hotels, Restaurants, Salons & More",
    description:
        "Explore verified partner merchants on CityWitty across hotels, restaurants, salons, fashion, electronics, and more. Discover amazing deals and discounts in top cities of India.",
    keywords: [
        "CityWitty merchants",
        "partner stores",
        "hotel deals",
        "restaurant discounts",
        "salon offers",
        "fashion shopping",
        "electronics discounts",
        "Mumbai merchants",
        "Delhi merchants",
        "Bangalore merchants",
        "Chennai merchants",
        "Pune merchants"
    ],
    alternates: {
        canonical: "https://citywitty.com/merchants",
    },
    openGraph: {
        title: "Partner Merchants - CityWitty",
        description:
            "Browse trusted partner merchants on CityWitty and grab exclusive offers across India.",
        url: "https://citywitty.com/merchants",
        siteName: "CityWitty",
        images: [
            {
                url: "https://citywitty.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "CityWitty Partner Merchants",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Partner Merchants - CityWitty",
        description:
            "Discover verified partner merchants on CityWitty and save big on hotels, restaurants, fashion, and more.",
        images: ["https://citywitty.com/og-image.png"],
    },
};

export default function MerchantsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
