import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | Create Your CityWitty Privilege Card Account",
    description:
        "Sign up for CityWitty Privilege Card to unlock exclusive lifestyle discounts, premium merchant offers, and smarter shopping rewards.",
    keywords: [
        "CityWitty Register",
        "CityWitty Sign Up",
        "Privilege Card Registration",
        "Exclusive Lifestyle Deals",
        "Discount Card Membership",
    ],
    openGraph: {
        title: "Register | CityWitty Privilege Card",
        description:
            "Create your CityWitty account today and access premium lifestyle offers, discounts, and loyalty rewards.",
        url: "https://citywitty.com/register",
        siteName: "CityWitty",
        images: [
            {
                url: "https://citywitty.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "CityWitty Register Page",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Register | CityWitty Privilege Card",
        description:
            "Join CityWitty and unlock premium lifestyle discounts and merchant deals.",
        images: ["https://citywitty.com/og-image.png"],
    },
    alternates: {
        canonical: "https://citywitty.com/register",
    },
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
