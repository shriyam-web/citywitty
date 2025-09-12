// app/activate-track/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Activate & Track Your CityWitty Card | CityWitty",
    description:
        "Easily activate your CityWitty discount card online or track your card delivery status in real-time. Quick, secure, and hassle-free process to start enjoying exclusive offers.",
    keywords:
        "CityWitty card activation, track CityWitty order, discount card tracking, activate discount card, CityWitty delivery status",
    openGraph: {
        title: "Activate & Track Your CityWitty Card | CityWitty",
        description:
            "Activate your CityWitty discount card instantly or track your card delivery with real-time updates. Get started today and unlock premium offers.",
        url: "https://citywitty.com/activate-track",
        siteName: "CityWitty",
        images: [
            {
                url: "https://citywitty.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Activate & Track CityWitty Card",
            },
        ],
        type: "website",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        site: "@citywitty",
        title: "Activate & Track Your CityWitty Card | CityWitty",
        description:
            "Easily activate your CityWitty discount card or track your card delivery status in real-time.",
        images: ["https://citywitty.com/og-image.png"],
    },
    alternates: {
        canonical: "https://citywitty.com/activate-track",
    },
};

export default function ActivateTrackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
