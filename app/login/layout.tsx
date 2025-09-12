// app/login/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - CityWitty | Access Your Discount Card Account",
    description:
        "Login to your CityWitty account to access exclusive merchant discounts, manage your card, and enjoy premium offers on restaurants, shopping, hotels, salons, and entertainment.",
    keywords:
        "CityWitty login, discount card login, user dashboard, access account, merchant offers login, citywitty sign in",
    openGraph: {
        title: "Login - CityWitty | Access Your Discount Card Account",
        description:
            "Sign in to your CityWitty account and unlock premium merchant discounts instantly.",
        url: "https://citywitty.com/login",
        siteName: "CityWitty",
        images: [
            {
                url: "https://citywitty.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "CityWitty Login - Discount Card Access",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@citywitty",
        title: "Login - CityWitty | Access Your Discount Card Account",
        description:
            "Login to your CityWitty account to manage your card and enjoy exclusive deals from 1000+ merchants.",
        images: ["https://citywitty.com/og-image.png"],
    },
    alternates: {
        canonical: "https://citywitty.com/login",
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
