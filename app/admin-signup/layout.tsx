// app/admin/signup/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Signup - CityWitty",
    description:
        "Create a secure admin account for CityWitty using your email, password, and secret code.",
    robots: {
        index: false,   // ❌ Search engines is page ko index nahi karenge
        follow: false,  // ❌ Links ko follow nahi karenge
    },
};

export default function AdminSignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
