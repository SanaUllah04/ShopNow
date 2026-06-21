"use client";

import Link from "next/link";
import { useCart } from "@/store/cartStore";
import { useSession, signOut } from "next-auth/react";

import { useState, useEffect } from "react";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const totalItems = useCart((s) => s.totalItems);
    const hydrate = useCart((s) => s.hydrate);
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    useEffect(() => {
        hydrate();
        setMounted(true);
    }, [hydrate]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between px-6 py-3 rounded-2xl glass-dark border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black text-white tracking-tighter hover:scale-105 transition-transform">
                        SHOP<span className="text-indigo-500">NOW</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-300 tracking-widest uppercase">
                        <Link href="/products" className="hover:text-white transition-colors">
                            Products
                        </Link>
                        {mounted && isAdmin && (
                            <Link href="/admin" className="hover:text-white transition-colors">
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 text-slate-300 hover:text-white transition-all hover:scale-110">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {mounted && totalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 text-white text-[10px] rounded-full flex items-center justify-center font-black shadow-lg shadow-indigo-500/50">
                                    {totalItems()}
                                </span>
                            )}
                        </Link>

                        {/* Auth */}
                        {mounted && (
                            session ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-slate-400 hidden sm:block uppercase tracking-wider">{session.user?.email?.split('@')[0]}</span>
                                    <button
                                        onClick={() => signOut()}
                                        className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-white border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                                    >
                                        LOGOUT
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-6 py-2 rounded-xl bg-white text-slate-950 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg"
                                >
                                    Sign In
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
