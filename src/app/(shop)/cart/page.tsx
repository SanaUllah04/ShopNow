"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { items, hydrate, remove, setQty, clear } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => { hydrate(); }, [hydrate]);

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate checkout process
        setTimeout(() => {
            clear();
            router.push("/checkout-success");
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#020617] pt-28 pb-20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-8">
                        Shopping <span className="text-gradient">Cart</span>
                    </h1>

                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-block p-6 rounded-full bg-white/5 border border-white/10 mb-6">
                                <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                            <p className="text-slate-400 mb-6">Looks like you haven't added any items yet.</p>
                            <button
                                onClick={() => router.push("/products")}
                                className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Browse Products →
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="md:col-span-2 space-y-4">
                                {items.map(i => (
                                    <div key={i._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center backdrop-blur-sm">
                                        <img src={i.image} alt={i.name} className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white">{i.name}</h3>
                                            <p className="text-indigo-400 font-semibold">${i.price}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQty(i._id, Math.max(1, i.qty - 1))}
                                                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-white font-semibold">{i.qty}</span>
                                            <button
                                                onClick={() => setQty(i._id, i.qty + 1)}
                                                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => remove(i._id)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="md:col-span-1">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-28">
                                    <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-slate-400">
                                            <span>Subtotal</span>
                                            <span className="text-white">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Shipping</span>
                                            <span className="text-emerald-400">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Tax</span>
                                            <span className="text-white">${(total * 0.1).toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-white/10 pt-3 flex justify-between">
                                            <span className="font-bold text-white">Total</span>
                                            <span className="text-2xl font-black text-white">${(total * 1.1).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isCheckingOut ? "Processing..." : "Checkout Now"}
                                    </button>

                                    <button
                                        onClick={() => router.push("/products")}
                                        className="w-full mt-3 py-3 text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}