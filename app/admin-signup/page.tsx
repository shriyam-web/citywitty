"use client";

import { useState } from "react";

export default function AdminSignup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/admin/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, secretCode }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setMessage(data.message);
            setUsername(""); setEmail(""); setPassword(""); setSecretCode("");
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 md:p-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                    Admin Signup
                </h2>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    Create your admin account by entering your details and <span className="font-medium text-indigo-600">secret code</span>.
                </p>

                {/* Message */}
                {message && (
                    <div className="text-center mb-4 text-red-500 font-medium">{message}</div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Secret Code"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-lg"
                    >
                        Create Admin Account
                    </button>
                </form>

                {/* Footer text */}
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an admin account? <span className="text-indigo-500 font-medium cursor-pointer"> <a href="/login">Login </a></span>
                </p>
            </div>
        </div>
    );
}
