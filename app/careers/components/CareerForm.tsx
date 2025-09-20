"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function CareerForm() {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        alert("Application submitted successfully!");
        // API call can go here
    };

    return (
        <section className=" rounded-xl p-10 w-full max-w-[90%] mx-auto" >

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
                    <PhoneInput
                        defaultCountry="IN"
                        international
                        countryCallingCodeEditable={false}
                        value={formData.phone}
                        onChange={(value) => setFormData((prev) => ({ ...prev, phone: value || "" }))}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="+91 98765 43210"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
                    <DatePicker
                        selected={formData.dob}
                        onChange={(date: Date | null) => date && setFormData((prev) => ({ ...prev, dob: date }))}
                        dateFormat="dd-MM-yyyy"
                        maxDate={new Date()}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        placeholderText="Select your date of birth"
                    />

                </div>

                {/* Position Applied */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Position Applied For</label>
                    <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select a position</option>
                        {positions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Joining Availability */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Joining Availability</label>
                    <select
                        name="joiningAvailability"
                        value={formData.joiningAvailability}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select availability</option>
                        {joiningOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Current Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">House No.</label>
                        <input
                            type="text"
                            name="houseNo"
                            value={formData.houseNo}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Area</label>
                        <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            readOnly
                            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Experience */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Experience (in months)</label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        min={0}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Highest Qualification Degree</label>
                        <input
                            type="text"
                            name="qualificationDegree"
                            value={formData.qualificationDegree}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Qualification %</label>
                        <input
                            type="number"
                            name="qualificationPercent"
                            value={formData.qualificationPercent}
                            onChange={handleChange}
                            required
                            min={0}
                            max={100}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Resume Upload */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Upload Resume (PDF, DOC, DOCX)</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="w-full"
                    />
                    {formData.resume && <p className="mt-1 text-sm text-gray-600">{formData.resume.name}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Submit Application
                </button>
            </form>
        </section>
    );
}
