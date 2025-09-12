// app/merchants/[id]/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Luxe Hotels & Resorts - Mumbai | 25% OFF | CityWitty",
    description:
        "Enjoy a luxurious stay at Luxe Hotels & Resorts, Mumbai. Get 25% OFF with CityWitty Discount Card. Fine dining, spa, swimming pool & world-class services.",
    keywords:
        "Luxe Hotels Mumbai, Hotels discount Mumbai, CityWitty hotel offers, Mumbai luxury stay, Luxe Resorts deal",
    openGraph: {
        title: "Luxe Hotels & Resorts - Mumbai | 25% OFF | CityWitty",
        description:
            "Book Luxe Hotels & Resorts in Mumbai with 25% OFF via CityWitty. Premium luxury stay, spa & fine dining included.",
        url: "https://citywitty.com/merchants/1",
        siteName: "CityWitty",
        images: [
            {
                url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
                width: 1200,
                height: 630,
                alt: "Luxe Hotels & Resorts - Mumbai",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@citywitty",
        title: "Luxe Hotels & Resorts - Mumbai | 25% OFF | CityWitty",
        description:
            "Book Luxe Hotels & Resorts in Mumbai with CityWitty and get 25% OFF. Luxury, spa & fine dining included.",
        images: [
            "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
    },
    alternates: {
        canonical: "https://citywitty.com/merchants/1",
    },
};

export default function MerchantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
