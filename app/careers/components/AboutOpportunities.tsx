"use client";

import { useState } from "react";
import { Briefcase, ChevronDown, ArrowRight } from "lucide-react";

export default function AboutOpportunities() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const openPositions = [
        {
            title: "Sales Executive / Business Development",
            tagline: "Drive growth through partnerships",
            type: "Full-time",
            details:
                "Identify and pursue new business opportunities, build strong client relationships, and achieve revenue targets. Work closely with the marketing and product teams to align sales strategies with company goals.",
        },
        {
            title: "Operations Associate / Intern",
            tagline: "Ensure smooth day-to-day operations",
            type: "Internship",
            details:
                "Assist in managing business processes, coordinate with internal teams, and support operational efficiency. Gain hands-on experience in handling workflows, documentation, and execution of business strategies.",
        },
        {
            title: "Social Media & Content Executive / Intern",
            tagline: "Create engaging digital stories",
            type: "Internship",
            details:
                "Manage social media platforms, curate engaging content, and monitor audience interactions. Support brand presence by creating posts, reels, and campaigns while analyzing trends and engagement metrics.",
        },
    ];


    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const scrollToForm = () => {
        const formSection = document.getElementById("applicationform");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="mb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Currently Recruiting for
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
                    CityWitty is hiring passionate individuals to join our growing team.
                    Click a position to view details and apply!
                </p>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
                {openPositions.map((job, index) => (
                    <div
                        key={job.title}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex justify-between items-center p-6 text-left hover:bg-blue-50 transition focus:outline-none"
                            aria-expanded={openIndex === index}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {job.title}
                                    </h3>
                                    <p className="text-gray-600">{job.tagline}</p>
                                </div>
                            </div>
                            <ChevronDown
                                className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Accordion Body */}
                        <div
                            className={`grid transition-all duration-300 ease-in-out ${openIndex === index
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden px-6 pb-6">
                                <p className="text-gray-700 mb-6">{job.details}</p>

                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
