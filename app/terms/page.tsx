import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | CityWitty',
    description:
        'Read the official Terms & Conditions for CityWitty. Understand your rights, responsibilities, and the rules for using our platform to discover deals and discounts from local merchants.',
    keywords: [
        'CityWitty Terms and Conditions',
        'User Terms',
        'CityWitty',
        'Terms of Service',
        'User Responsibilities',
        'Service Agreement',
    ],
    openGraph: {
        title: 'Terms & Conditions | CityWitty',
        description:
            'Official Terms & Conditions for using CityWitty. Covering user rights, responsibilities, prohibited activities, and legal disclaimers.',
        url: 'https://citywitty.com/terms',
        siteName: 'CityWitty',
        images: [
            {
                url: 'https://citywitty.com/og-image.png',
                width: 1200,
                height: 630,
                alt: 'CityWitty Terms & Conditions',
            },
        ],
        locale: 'en_IN',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms & Conditions | CityWitty',
        description:
            "Review CityWitty's Terms & Conditions for using our platform and services.",
        images: ['https://citywitty.com/og-image.png'],
    },
    alternates: {
        canonical: 'https://citywitty.com/terms',
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <br />
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
                <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

                <p className="mb-6">
                    Welcome to CityWitty. By accessing and using this platform to browse merchants, access deals, and make purchases, you agree to comply with the following terms and conditions. Please read these carefully before proceeding with your use of our services.
                </p>

                <h2 className="text-2xl font-semibold mb-4">1. Use of Platform</h2>
                <p className="mb-4">
                    CityWitty provides a platform for users to discover, compare, and access deals and discounts from local merchants across India. By using our platform, you agree to use it only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the platform.
                </p>

                <h2 className="text-2xl font-semibold mb-4">2. User Account</h2>
                <p className="mb-4">
                    To access certain features of CityWitty, you may need to create a user account. You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
                </p>

                <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Provide accurate and complete information when creating an account.</li>
                    <li>Use the platform only for personal, non-commercial purposes.</li>
                    <li>Not engage in any activity that disrupts or impairs the functioning of the platform.</li>
                    <li>Not attempt to gain unauthorized access to any part of the platform.</li>
                    <li>Not post, transmit, or display abusive, vulgar, hateful, or defamatory content.</li>
                    <li>Not misuse deals or engage in fraudulent transactions.</li>
                    <li>Comply with all applicable laws and regulations.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">4. Deals and Discounts</h2>
                <p className="mb-4">
                    The deals and discounts displayed on CityWitty are subject to the terms and conditions of each individual merchant. CityWitty is not responsible for:
                </p>
                <ul className="list-disc list-inside mb-6">
                    <li>The accuracy or authenticity of deal information provided by merchants.</li>
                    <li>Merchants' failure to honor deals or provide advertised services.</li>
                    <li>Quality issues with products or services purchased through offers on our platform.</li>
                    <li>Any disputes between you and merchants regarding deals or services.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">5. Payments and Transactions</h2>
                <p className="mb-4">
                    All payment transactions are processed through secure payment gateways. By making a payment, you authorize the payment processor to charge your account. CityWitty is not responsible for payment processing errors, declined transactions, or charges by third-party payment providers. Review all transaction details carefully before confirming payment.
                </p>

                <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                <p className="mb-4">
                    All content on CityWitty, including logos, designs, text, graphics, and software, are the intellectual property of CityWitty or third-party licensors. You may not reproduce, distribute, or transmit any content without prior written permission. Unauthorized use of our intellectual property is strictly prohibited.
                </p>

                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">
                    To the fullest extent permitted by law, CityWitty shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to:
                </p>
                <ul className="list-disc list-inside mb-6">
                    <li>Loss of revenue or profits.</li>
                    <li>Loss of data or information.</li>
                    <li>Business interruption.</li>
                    <li>Any other loss or damage, even if CityWitty has been advised of the possibility thereof.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
                <p className="mb-4">
                    CityWitty provides the platform "as-is" and "as available" without warranties of any kind, express or implied. We make no warranty that the platform will meet your requirements, be uninterrupted, timely, or error-free. To the fullest extent permitted by law, CityWitty disclaims all warranties, including those of merchantability and fitness for a particular purpose.
                </p>

                <h2 className="text-2xl font-semibold mb-4">9. Termination of Access</h2>
                <p className="mb-4">
                    CityWitty reserves the right to suspend or terminate your access to the platform at its sole discretion, including for violation of these terms, fraudulent activities, or any other reason deemed necessary. Termination may occur with or without prior notice.
                </p>

                <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
                <p className="mb-4">
                    These Terms & Conditions are governed by the laws of India. Any disputes arising from your use of CityWitty shall be subject to the exclusive jurisdiction of the competent courts in Noida, Uttar Pradesh.
                </p>

                <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
                <p className="mb-4">
                    CityWitty reserves the right to modify these Terms & Conditions at any time. Changes will be effective upon posting to the platform. Your continued use of the platform following such modifications constitutes your acceptance of the updated terms.
                </p>

                <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions or concerns about these Terms & Conditions, please contact our support team at <a href="mailto:support@citywitty.com" className="text-blue-600 underline">support@citywitty.com</a>.
                </p>

                <p className="text-gray-600 mt-8">
                    By using CityWitty, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                </p>
            </section>

            <Footer />
        </main>
    );
}
