"use client";

import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function CareerForm() {
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSubmitted && formRef.current) {
            // Scroll smoothly to the top of the form container
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isSubmitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let resumeBase64 = "";

        // Convert resume file to base64 if present
        if (formData.resume) {
            const file = formData.resume;
            const reader = new FileReader();
            reader.readAsDataURL(file);

            await new Promise<void>((resolve) => {
                reader.onload = () => {
                    resumeBase64 = reader.result as string;
                    resolve();
                };
            });
        }

        const payload = {
            ...formData,
            dob: formData.dob.toISOString(),
            experience: formData.experience ? Number(formData.experience) : null,
            expectedSalary: formData.expectedSalary ? Number(formData.expectedSalary) : null,
            resumeBase64, // send the file in base64 for Cloudinary upload
        };

        try {
            const res = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setApplicationId(data.data.applicationId); // store generated ID
                setIsSubmitted(true); // show success screen
            } else {
                alert("Error: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };



    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: new Date(),
        position: "",
        joiningAvailability: "",
        houseNo: "",
        area: "",
        city: "",
        state: "",
        country: "India",
        experience: "",
        qualificationDegree: "",
        qualificationPercent: "",
        expectedSalary: "", // ✅ new field
        resume: null as File | null,
    });

    const positions = [
        "Frontend Developer",
        "Backend Developer",
        "UI/UX Designer",
        "Marketing Executive",
        "Customer Success Manager",
    ];

    const joiningOptions = [
        "Immediate",
        "7 Days",
        "15 Days",
        "1 Month",
        "Other",
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
        }
    };

    return (
        <section ref={formRef}
            id="applicationform"
            className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
            <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 lg:p-12">
                {isSubmitted ? (
                    // ✅ Success Screen
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">
                            Application Submitted Successfully!
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Thank you for applying. Our team will get back to you soon.
                        </p>

                        {/* ✅ Show Application ID */}
                        {applicationId && (
                            <p className="text-gray-800 font-medium mb-6">
                                Your Application ID: <span className="text-blue-600">{applicationId}</span>
                            </p>
                        )}
                        <button
                            onClick={() => {
                                setIsSubmitted(false); // reset to show form again
                                setFormData({
                                    fullName: "",
                                    email: "",
                                    phone: "",
                                    dob: new Date(),
                                    position: "",
                                    joiningAvailability: "",
                                    houseNo: "",
                                    area: "",
                                    city: "",
                                    state: "",
                                    country: "India",
                                    experience: "",
                                    qualificationDegree: "",
                                    qualificationPercent: "",
                                    expectedSalary: "",
                                    resume: null,
                                });
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
                        >
                            Submit Another Application
                        </button>
                    </div>
                ) : (

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* ================= Left Column ================= */}
                        <div className="space-y-6">

                            {/* Full Name */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <PhoneInput
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    value={formData.phone}
                                    onChange={(value) =>
                                        setFormData((prev) => ({ ...prev, phone: value || "" }))
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <DatePicker
                                    selected={formData.dob}
                                    onChange={(date: Date | null) =>
                                        date && setFormData((prev) => ({ ...prev, dob: date }))
                                    }
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                    showYearDropdown
                                    showMonthDropdown
                                    dropdownMode="select"
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                    placeholderText="Select your date of birth"
                                />
                            </div>

                            {/* Position Applied */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Position Applied For <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a position</option>
                                    {positions.map((pos) => (
                                        <option key={pos} value={pos}>{pos}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Joining Availability */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Joining Availability <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="joiningAvailability"
                                    value={formData.joiningAvailability}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select availability</option>
                                    {joiningOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* ================= Right Column ================= */}
                        <div className="space-y-6">

                            {/* Address */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "houseNo", label: "House No." },
                                    { name: "area", label: "Area" },
                                    { name: "city", label: "City" },
                                    { name: "state", label: "State" }
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block mb-1 font-medium text-gray-700">
                                            {field.label} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={(formData as any)[field.name]}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}

                                {/* Country */}
                                <div className="sm:col-span-2">
                                    <label className="block mb-1 font-medium text-gray-700">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        readOnly
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Experience (in months) <span className="text-gray-400 text-sm">(optional)</span>
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    min={0}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Qualification */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">
                                        Highest Qualification Degree <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="qualificationDegree"
                                        value={formData.qualificationDegree}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">
                                        Qualification % <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="qualificationPercent"
                                        value={formData.qualificationPercent}
                                        onChange={handleChange}
                                        required
                                        min={0}
                                        max={100}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Expected Salary */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Expected Salary (Optional)
                                </label>
                                <input
                                    type="number"
                                    name="expectedSalary"
                                    value={formData.expectedSalary || ""}
                                    onChange={handleChange}
                                    min={0}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter expected salary"
                                />
                            </div>


                            {/* Resume Upload */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Upload Resume (PDF, DOC, DOCX) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 
                   file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded-md 
                   file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                                />
                                {formData.resume && (
                                    <p className="mt-1 text-sm text-gray-600">{formData.resume.name}</p>
                                )}
                            </div>



                        </div>

                        {/* ================= Submit ================= */}
                        <div className="lg:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition"
                            >
                                Submit Application
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                            Fields marked with <span className="text-red-500">*</span> are mandatory.
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
}
