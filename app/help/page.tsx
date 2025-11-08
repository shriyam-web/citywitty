import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, MapPin, HelpCircle, Book, Users, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Help Center | CityWitty',
    description: 'Get help with your CityWitty discount card. Find answers to common questions, contact support, and learn how to make the most of your membership.',
    keywords: 'CityWitty help, discount card support, customer service, FAQ, contact support',
};

export default function HelpPage() {
    const faqs = [
        {
            question: "How do I activate my CityWitty card?",
            answer: "Visit our Activate & Track page, enter your card details, and follow the simple activation process. You'll receive confirmation via email and SMS."
        },
        {
            question: "Where can I use my CityWitty discount card?",
            answer: "Your card works at all our partnered merchants across India. Check our Merchants page to find locations near you and available discounts."
        },
        {
            question: "How do I track my card usage and benefits?",
            answer: "Log into your dashboard to view your card status, transaction history, and available benefits. You can also use our Activate & Track page."
        },
        {
            question: "What if I lose my card?",
            answer: "Contact our support team immediately at +91 6389202030 or email contact@citywitty.com. We'll help you block the lost card and issue a replacement."
        },
        {
            question: "Can I upgrade or renew my membership?",
            answer: "Yes! Visit our Get Card page to explore upgrade options or renew your existing membership. Contact support for personalized assistance."
        },
        {
            question: "How do I become a partner merchant?",
            answer: "Visit partner.citywitty.com to learn about our partnership program. Fill out the application form and our team will contact you within 24-48 hours."
        }
    ];

    const supportOptions = [
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Chat with our support team",
            action: "Start Chat",
            href: "/contact",
            available: "24/7 Available"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Call our helpline",
            action: "Call Now",
            href: "tel:+916389202030",
            available: "Mon-Sat: 9AM-9PM"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "Send us an email",
            action: "Send Email",
            href: "mailto:contact@citywitty.com",
            available: "Response within 24hrs"
        },
        {
            icon: MapPin,
            title: "Visit Office",
            description: "Meet us in person",
            action: "Get Directions",
            href: "https://maps.app.goo.gl/3dUsoBqaWssY3Sqb9",
            available: "By appointment only"
        }
    ];

    const quickLinks = [
        {
            icon: CreditCard,
            title: "Get Your Card",
            description: "Purchase or upgrade your membership",
            href: "/get-card"
        },
        {
            icon: Users,
            title: "Partner Program",
            description: "Join our merchant network",
            href: "https://partner.citywitty.com"
        },
        {
            icon: Book,
            title: "User Guide",
            description: "Learn how to use your card",
            href: "/activate-track"
        },
        {
            icon: HelpCircle,
            title: "FAQ",
            description: "Browse common questions",
            href: "#faq"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span>Back to Home</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Search className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">Search help articles...</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions, get support, or learn how to make the most of your CityWitty membership.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {quickLinks.map((link, index) => {
                        const IconComponent = link.icon;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                            >
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{link.title}</h3>
                                    <p className="text-sm text-gray-600">{link.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Support Options */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Contact Support
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {supportOptions.map((option, index) => {
                            const IconComponent = option.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                                    <p className="text-xs text-green-600 font-medium mb-4">{option.available}</p>
                                    <Link
                                        href={option.href}
                                        className="inline-block bg-gradient-to-r from-blue-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                                    >
                                        {option.action}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors"
                            >
                                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Still Need Help */}
                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our support team is here to help you with any questions about your CityWitty membership.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Contact Support
                            </Link>
                            <Link
                                href="tel:+916389202030"
                                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Call +91 6389202030
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
