"use client";

import { ProductCard } from "@/components/ProductCard";
import { useState, useEffect, use, Suspense } from "react";
import { mockProducts } from "@/lib/mockData";

function ProductsList({ searchParamsPromise }: { searchParamsPromise: Promise<any> }) {
    const searchParams = use(searchParamsPromise);
    const initialQuery = searchParams?.q ?? "";

    const [products] = useState(mockProducts);
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("featured");

    const categories = ["All", "Smartphones", "Wearables", "Audio", "Accessories"];

    useEffect(() => {
        let filtered = [...products];

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Sort
        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === "featured") {
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, sortBy, products]);

    return (
        <main className="min-h-screen bg-[#020617] pt-28 pb-20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-1/4 h-1/4 bg-fuchsia-500/5 blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8">
                    <div>
                        <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 block">
                            Ultra26 Series
                        </span>
                        <h1 className="text-5xl font-black text-white tracking-tighter">
                            Our <span className="text-gradient">Products</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-96">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Explore our lineup..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all backdrop-blur-md"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                    selectedCategory === cat
                                        ? "bg-white text-slate-950"
                                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="ml-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold outline-none focus:border-white/20 transition-all backdrop-blur-md"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="py-40 text-center">
                        <div className="inline-block p-6 rounded-full bg-white/5 border border-white/10 mb-6">
                            <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-400">No products found.</h2>
                        <p className="text-slate-500 mt-2">Try adjusting your filters or search.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-slate-400 mb-6">
                            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {filteredProducts.map((p: any) => (
                                <ProductCard key={p._id} p={p} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default function ProductsPage({ searchParams }: { searchParams: Promise<any> }) {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#020617] pt-28 pb-20 flex items-center justify-center">
                <div className="text-center text-slate-400 text-lg font-semibold">Loading catalogue...</div>
            </main>
        }>
            <ProductsList searchParamsPromise={searchParams} />
        </Suspense>
    );
}
