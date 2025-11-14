import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cookies Policy | CityWitty',
    description:
        "Understand how CityWitty uses cookies and similar technologies to enhance your browsing experience. Learn about cookie types and how to manage your preferences.",
    keywords: [
        'CityWitty Cookies Policy',
        'Cookies',
        'Cookie Settings',
        'Privacy',
        'Browser Cookies',
    ],
    openGraph: {
        title: 'Cookies Policy | CityWitty',
        description:
            'CityWitty Cookies Policy - Information about how we use cookies to improve your experience.',
        url: 'https://citywitty.com/cookies',
        siteName: 'CityWitty',
        images: [
            {
                url: 'https://citywitty.com/og-image.png',
                width: 1200,
                height: 630,
                alt: 'CityWitty Cookies Policy',
            },
        ],
        locale: 'en_IN',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cookies Policy | CityWitty',
        description:
            'Learn how CityWitty uses cookies to provide you with the best experience.',
        images: ['https://citywitty.com/og-image.png'],
    },
    alternates: {
        canonical: 'https://citywitty.com/cookies',
    },
};

export default function CookiesPolicyPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-6 text-gray-800">
                        <h1 className="text-4xl font-bold mb-8 text-center">Cookies Policy</h1>

                        <p className="mb-6 text-lg">
                            This Cookies Policy explains how <strong>CityWitty</strong> uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">What are Cookies?</h2>
                        <p className="mb-6">
                            Cookies are small text files that are placed on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to website owners about user behavior.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Cookies</h2>
                        <p className="mb-6">
                            CityWitty uses cookies to improve your browsing experience, understand how you interact with our platform, personalize the content you see, and enhance our services. We may also use cookies for security purposes and to analyze traffic patterns.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-4">Types of Cookies We Use</h3>
                        <ul className="list-disc list-inside mb-6 space-y-3">
                            <li>
                                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic features like page navigation, access to secure areas, and form submission.
                            </li>
                            <li>
                                <strong>Performance Cookies:</strong> These cookies help us understand how visitors use our website by collecting and reporting anonymous information. This helps us improve our platform's performance and user experience.
                            </li>
                            <li>
                                <strong>Functional Cookies:</strong> These cookies remember your choices and preferences, such as your preferred city, language, or login information, to enhance your personalized experience.
                            </li>
                            <li>
                                <strong>Advertising Cookies:</strong> These cookies deliver relevant advertisements based on your interests and browsing history. They may be set by us or third-party partners.
                            </li>
                            <li>
                                <strong>Social Media Cookies:</strong> These cookies allow you to share content from our platform on social media networks and help track the effectiveness of social media advertising.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Cookies</h2>
                        <p className="mb-6">
                            Some cookies on our platform may be set by third-party services, including analytics providers, payment processors, and advertising partners. These third parties may use cookies to track your activity across different websites.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Managing Your Cookie Preferences</h2>
                        <p className="mb-6">
                            You have the right to control and manage cookies in various ways:
                        </p>
                        <ul className="list-disc list-inside mb-6 space-y-2">
                            <li>Most web browsers allow you to refuse cookies or alert you when a cookie is being set.</li>
                            <li>You can disable cookies through your browser settings (typically found in preferences or settings).</li>
                            <li>You can use browser extensions to block cookies selectively.</li>
                            <li>You can opt-out of third-party cookies through industry opt-out mechanisms.</li>
                        </ul>
                        <p className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                            <strong>Note:</strong> Please be aware that removing or blocking cookies may negatively impact your experience and some parts of our website may no longer be fully functional. Essential cookies cannot be disabled without affecting site functionality.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
                        <p className="mb-6">
                            Under various privacy regulations, you may have rights regarding cookies and tracking technologies. You have the right to:
                        </p>
                        <ul className="list-disc list-inside mb-6 space-y-2">
                            <li>Know what cookies are being used on our website.</li>
                            <li>Control which cookies you want to accept.</li>
                            <li>Request information about the cookies we use.</li>
                            <li>Ask us to delete cookies about you.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
                        <p className="mb-6">
                            We may update this Cookies Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about any updates.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                        <p className="mb-6">
                            If you have any questions about our use of cookies, this Cookies Policy, or your cookie preferences, please contact us at{" "}
                            <a
                                href="mailto:support@citywitty.com"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                support@citywitty.com
                            </a>
                            .
                        </p>

                        <p className="text-gray-600 mt-12 pt-6 border-t border-gray-200">
                            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
