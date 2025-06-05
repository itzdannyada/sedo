"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AuthForm() {
    const router = useRouter();
    const [mode, setMode] = useState<"signin" | "register">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleInputChange = (field: string, value: string) => {
        if (field === "email") setEmail(value);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }
            const result = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
            });
            setLoading(false);
            if (result && result.ok) {
                toast.success("Signed in!");
                router.push("/"); // Redirect to home page or desired route
            } else {
                toast.error(result?.error || "Sign in failed. Please check your credentials.");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex text-white flex-col items-center justify-center space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-auto m-2"> 
            <div className="relative flex w-64 rounded-full p-1">
                <button
                    type="button"
                    className={`flex-1 text-center px-4 py-2 rounded-full transition-colors duration-200 ${
                        mode === "signin"
                            ? "bg-cyan-500 text-white shadow"
                            : "bg-transparent"
                    }`}
                    onClick={() => setMode("signin")}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    className={`flex-1 text-center px-4 py-2 rounded-full transition-colors duration-200 ${
                        mode === "register"
                            ? "bg-green-600 text-white shadow"
                            : "bg-transparent"
                    }`}
                    onClick={() => setMode("register")}
                >
                    Register
                </button>
            </div>
            {mode === "signin" ? (
                <form className="space-y-4" onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded focus:outline-none pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-2 flex items-center"
                            onClick={() => setShowPassword((v) => !v)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="w-5 h-5 text-cyan-500" />
                            ) : (
                                <FiEye className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="rememberMe" className="flex items-center justify-between w-full cursor-pointer select-none">
                            <span className="text-gray-200 text-sm mr-2">Remember me</span>
                            <div className="relative flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="peer appearance-none h-5 w-5 border border-gray-400 rounded bg-transparent checked:bg-cyan-500 checked:border-cyan-500 transition-colors duration-200"
                                />
                                <span className="pointer-events-none absolute w-5 h-5 flex items-center justify-center">
                                    {/* Checkmark SVG, only visible when checked */}
                                    {rememberMe && (
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            ) : (
                <form className="space-y-4" onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded focus:outline-none pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-2 flex items-center"
                            onClick={() => setShowPassword((v) => !v)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="w-5 h-5 text-cyan-500" />
                            ) : (
                                <FiEye className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            )}
        </div>
    );
}