"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home after 5 seconds
        const timer = setTimeout(() => {
            router.push("/products");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="min-h-screen bg-[#020617] flex items-center justify-center pt-20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-lg mx-auto text-center">
                    <div className="inline-block p-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-8 animate-fade-up">
                        <svg className="w-20 h-20 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-black text-white tracking-tighter mb-4 animate-fade-up delay-100">
                        Order <span className="text-emerald-400">Confirmed!</span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-8 animate-fade-up delay-200">
                        Thank you for your purchase. Your order has been successfully placed and will be shipped soon.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm animate-fade-up delay-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400">Order Number</span>
                            <span className="text-white font-bold">#ORD-{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400">Estimated Delivery</span>
                            <span className="text-white font-bold">3-5 Business Days</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Shipping Method</span>
                            <span className="text-emerald-400 font-bold">Free Standard</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-500">
                        <button
                            onClick={() => router.push("/products")}
                            className="flex-1 bg-white text-slate-950 py-4 rounded-2xl font-black hover:bg-slate-200 transition-colors"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            Back to Home
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-slate-500 animate-fade-up delay-500">
                        Redirecting to products page in 5 seconds...
                    </p>
                </div>
            </div>
        </main>
    );
}
