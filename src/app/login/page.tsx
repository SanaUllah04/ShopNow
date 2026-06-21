"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Invalid credentials. Try using one of the test accounts below.");
                setLoading(false);
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    const fillCredentials = (testEmail: string, testPass: string) => {
        setEmail(testEmail);
        setPassword(testPass);
    };

    return (
        <div className="relative z-10 w-full max-w-md px-6">
            {/* Logo Link */}
            <div className="text-center mb-8">
                <Link href="/" className="text-3xl font-black tracking-tighter text-white">
                    SHOP<span className="text-indigo-500">NOW</span>
                </Link>
                <p className="text-slate-400 text-sm mt-2">Sign in to manage your orders and view specs.</p>
            </div>

            {/* Glassmorphic Form Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6">Welcome Back</h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs leading-relaxed">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-slate-500 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-slate-500 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black text-sm hover:bg-slate-200 transition-colors disabled:opacity-50 tracking-wider uppercase mt-6"
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>

                {/* Helper Demo Accounts */}
                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
                        Demo Test Accounts (Click to Autofill)
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => fillCredentials("admin@example.com", "Admin@12345")}
                            className="flex flex-col text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-white/[0.08]"
                        >
                            <span className="text-[11px] font-bold text-indigo-400">Admin Account</span>
                            <span className="text-[10px] text-slate-400 truncate">admin@example.com</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => fillCredentials("john@example.com", "User@12345")}
                            className="flex flex-col text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-white/[0.08]"
                        >
                            <span className="text-[11px] font-bold text-indigo-400">Customer Account</span>
                            <span className="text-[10px] text-slate-400 truncate">john@example.com</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center mt-6 text-xs text-slate-500">
                <p>Demo mode only. Any password works for custom emails.</p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white flex items-center justify-center pt-20 pb-12">
            {/* Ambient gradients */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />
                <div className="absolute bottom-10 right-[-10%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
                <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
            </div>

            <Suspense fallback={
                <div className="text-center text-slate-400 text-lg font-bold">Loading credentials form...</div>
            }>
                <LoginForm />
            </Suspense>
        </main>
    );
}
