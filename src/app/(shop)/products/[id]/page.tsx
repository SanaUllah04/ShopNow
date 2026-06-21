import { AddToCartButton } from "@/components/AddToCartButton";
import { mockDb } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

async function getProduct(id: string) {
    const product = mockDb.products.findById(id);
    return product || null;
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);
    
    if (!product) return (
        <main className="min-h-screen bg-[#020617] pt-28 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
                <Link href="/products" className="text-indigo-400 hover:text-indigo-300">Back to Products</Link>
            </div>
        </main>
    );

    return (
        <main className="min-h-screen bg-[#020617] pt-28 pb-20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Product Image */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-3xl rounded-3xl" />
                            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex items-center justify-center overflow-hidden aspect-square">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-6"
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                                    {product.category}
                                </span>
                                <h1 className="text-4xl font-black text-white tracking-tighter">{product.name}</h1>
                            </div>

                            <p className="text-slate-400 leading-relaxed">{product.description}</p>

                            <div className="flex items-center gap-6">
                                <span className="text-4xl font-black text-white">${product.price}</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    product.stock > 10
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        : product.stock > 0
                                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                                }`}>
                                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                </span>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div className="text-2xl mb-2">🚚</div>
                                    <div className="text-sm text-slate-400">Free Shipping</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div className="text-2xl mb-2">🛡️</div>
                                    <div className="text-sm text-slate-400">2 Year Warranty</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div className="text-2xl mb-2">↩️</div>
                                    <div className="text-sm text-slate-400">30-Day Returns</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div className="text-2xl mb-2">💳</div>
                                    <div className="text-sm text-slate-400">Secure Payment</div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}