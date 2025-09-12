// app/user/dashboard/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "User Dashboard - CityWitty",
    description:
        "Access your CityWitty card details, offers, and usage history in your personal dashboard.",
    robots: {
        index: false,   // ❌ Search engines will NOT index this page
        follow: false,  // ❌ Links won’t be followed
    },
};

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
