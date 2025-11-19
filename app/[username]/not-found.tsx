import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function UsernameNotFound() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                <div className="container mx-auto px-4 text-center py-20">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Merchant Not Found</h1>
                    <p className="text-lg text-slate-600 mb-8">
                        The merchant profile you&apos;re looking for doesn&apos;t exist or is no longer available.
                    </p>
                    <Link
                        href="/merchants"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                    >
                        Browse All Merchants
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
