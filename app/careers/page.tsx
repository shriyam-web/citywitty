import { Metadata } from "next";
import AboutOpportunities from "@/app/careers/components/AboutOpportunities";
import CareerForm from "@/app/careers/components/CareerForm";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
    title: "Careers at CityWitty | Join Our Team",
    description:
        "Explore career opportunities at CityWitty. Apply now to become part of a fast-growing platform offering premium benefits and exciting career growth.",
};

export default function CareersPage() {
    return (
        <>
            <Header />
            <main className="bg-gray-50 min-h-screen">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 md:px-12 text-center overflow-hidden">
                    {/* Optional: subtle abstract background */}
                    <div className="absolute inset-0 opacity-20">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 800 600"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="400" cy="300" r="300" fill="white" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Join CityWitty
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Be part of a fast-growing platform revolutionizing the way people
                            experience premium benefits. We are looking for passionate and
                            talented individuals to join our team.
                        </p>
                        <a
                            href="#applicationform"
                            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition"
                        >
                            Apply Now
                        </a>
                    </div>
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            {/* About Opportunities */}
                            <section className="pt-16 px-6 md:px-12 max-w-7xl mx-auto">
                                <AboutOpportunities />
                            </section>
                        </div>


                        <div className="col-sm-6">
                            {/* Career Application Form */}
                            <div id="applicationform">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" >
                                    Apply for a Position

                                </h2>
                                <p className="mt-2 text-center text-gray-600">
                                    Fill out the form below and our team will get back to you.
                                </p>

                            </div>
                            <CareerForm />
                        </div>
                    </div>
                </div>

                {/* Footer CTA (optional) */}
                <section className="bg-blue-600 text-white py-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to shape the future with us?
                    </h3>
                    <p className="mb-6 text-white/90 max-w-2xl mx-auto">
                        Don’t wait—submit your application and become part of CityWitty today!
                    </p>
                    <a
                        href="#applicationform"
                        className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition"
                    >
                        Apply Now
                    </a>
                </section>
            </main>
            <Footer />
        </>
    );
}
