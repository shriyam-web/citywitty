// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact CityWitty - Support, Inquiries & Assistance",
    description:
        "Get in touch with CityWitty for customer support, business inquiries, or partnership opportunities. Reach us via phone, WhatsApp, email, or our contact form.",
    keywords:
        "CityWitty contact, customer support, business inquiry, CityWitty phone, CityWitty email, partnership CityWitty, discount card support",
    openGraph: {
        title: "Contact CityWitty - Support, Inquiries & Assistance",
        description:
            "We’re here to help! Contact CityWitty for support, partnership inquiries, or any questions. Reach us by phone, WhatsApp, email, or our contact form.",
        url: "https://citywitty.com/contact",
        siteName: "CityWitty",
        images: [
            {
                url: "https://citywitty.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "CityWitty Contact Page",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@citywitty",
        title: "Contact CityWitty - Support, Inquiries & Assistance",
        description:
            "Need help or have a question? Reach out to CityWitty’s support team by phone, WhatsApp, email, or contact form.",
        images: ["https://citywitty.com/og-image.png"],
    },
    alternates: {
        canonical: "https://citywitty.com/contact",
    },
    category: "Customer Support",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
