"use client";

import { Briefcase } from "lucide-react";

export default function AboutOpportunities() {
    const openPositions = [
        {
            title: "Frontend Developer",
            tagline: "Craft beautiful user experiences",
        },
        {
            title: "Backend Developer",
            tagline: "Build robust and scalable APIs",
        },
        {
            title: "UI/UX Designer",
            tagline: "Design intuitive interfaces",
        },
        {
            title: "Marketing Executive",
            tagline: "Drive growth and engagement",
        },
        {
            title: "Customer Success Manager",
            tagline: "Ensure happiness for our users",
        },
    ];

    return (
        <section className="mb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Currently Open Positions
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    CityWitty is looking for talented individuals who want to grow with us.
                    Browse our open positions below and click "Apply" to join our team!
                </p>
            </div>

            {/* Positions List */}
            <ul className="divide-y divide-gray-200 bg-white rounded-xl  overflow-hidden">
                {openPositions.map((position) => (
                    <li
                        key={position.title}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 hover:bg-blue-50 transition"
                    >
                        <div className="flex items-start sm:items-center gap-4">
                            <Briefcase className="w-6 h-6 text-blue-600 mt-1 sm:mt-0" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {position.title}
                                </h3>
                                <p className="text-gray-600">{position.tagline}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const formSection = document.getElementById("applicationform");
                                formSection?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="mt-4 sm:mt-0 bg-blue-600 text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                        >
                            Apply
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
