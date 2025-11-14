import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Privacy Policy | CityWitty',
    description:
        "Read CityWitty's Privacy Policy. Learn how we collect, use, store, and protect your personal information when you use our platform to discover deals and discounts from local merchants.",
    keywords: [
        'CityWitty Privacy Policy',
        'User Data Protection',
        'Privacy',
        'Data Security',
        'Information Protection',
    ],
    openGraph: {
        title: 'Privacy Policy | CityWitty',
        description:
            'Detailed Privacy Policy outlining how CityWitty collects, uses, and safeguards your personal data in compliance with legal standards.',
        url: 'https://citywitty.com/privacy',
        siteName: 'CityWitty',
        images: [
            {
                url: 'https://citywitty.com/citywittynew.jpg',
                width: 1200,
                height: 630,
                alt: 'CityWitty Privacy Policy',
            },
        ],
        locale: 'en_IN',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | CityWitty',
        description:
            'Understand how CityWitty protects your data. Full details in our Privacy Policy.',
        images: ['https://citywitty.com/citywittynew.jpg'],
    },
    alternates: {
        canonical: 'https://citywitty.com/privacy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                        Privacy Policy
                    </h1>

                    <p className="text-gray-700 mb-6">
                        CityWitty is committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, store, and protect your personal information when you browse merchants, access deals, and use our services. By using CityWitty, you consent to the practices described below.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                    <p className="text-gray-700 mb-4">
                        We collect personal information to provide you with a personalized and seamless experience:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li><strong>Account Information:</strong> Name, email address, phone number, and password when you create an account.</li>
                        <li><strong>Location Data:</strong> Your city and preferred location to show you relevant local merchants and deals.</li>
                        <li><strong>Transaction Information:</strong> Details of merchants you visit, deals you access, and purchases you make.</li>
                        <li><strong>Device Information:</strong> Device type, browser type, IP address, and usage patterns to improve our service.</li>
                        <li><strong>Communication Data:</strong> Messages and feedback you send us through our platform.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                    <p className="text-gray-700 mb-6">
                        Your information is used to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li>Create and manage your account.</li>
                        <li>Show you relevant merchants and deals in your area.</li>
                        <li>Send you notifications about new offers and updates.</li>
                        <li>Process your transactions and provide customer support.</li>
                        <li>Improve our platform through analytics and user behavior insights.</li>
                        <li>Comply with legal and regulatory requirements.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security and Protection</h2>
                    <p className="text-gray-700 mb-6">
                        CityWitty employs strict technical and organizational measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li>Encryption of sensitive data in transit and at rest.</li>
                        <li>Secure storage and access control policies.</li>
                        <li>Regular security audits and system updates.</li>
                        <li>Compliance with industry security standards.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sharing of Information</h2>
                    <p className="text-gray-700 mb-6">
                        We do not sell your personal data to third parties. Your information may be shared with:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li>Payment processors to process your transactions securely.</li>
                        <li>Merchants you interact with to facilitate deals and services.</li>
                        <li>Legal authorities when required by law or regulation.</li>
                        <li>Service providers who assist us in operating our platform.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                    <p className="text-gray-700 mb-6">
                        You have the right to access, correct, update, or delete your personal information at any time. You can also opt-out of promotional communications. Requests can be sent to our support team at <a href="mailto:support@citywitty.com" className="text-blue-600 underline">support@citywitty.com</a>.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to Privacy Policy</h2>
                    <p className="text-gray-700 mb-6">
                        CityWitty may update this Privacy Policy periodically. Users are encouraged to review this page regularly. Significant changes will be communicated via email or platform notifications.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                    <p className="text-gray-700">
                        For questions or concerns about this Privacy Policy or your data, contact our support team at <a href="mailto:support@citywitty.com" className="text-blue-600 underline">support@citywitty.com</a>.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
