import Link from "next/link";
import PhoneMockup from "@/components/PhoneMockup";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";

const FEATURES = [
    { title: "Bionic Display", desc: `6.9" OLED, 2000 nits peak brightness.` },
    { title: "Pro Camera", desc: "108MP cinematic sensor with pro-grade stabilization." },
    { title: "Titanium Build", desc: "Aerospace-grade durability with ultra-light feel." },
];

const STATS = [
    { label: "Peak Brightness", value: "2000 nits" },
    { label: "Charging", value: "0-70% in 22m" },
    { label: "Camera", value: "108MP" },
    { label: "Warranty", value: "2 Years" },
];

export default function HomePage() {
    const featured = mockProducts.filter((p: any) => p.featured).slice(0, 8);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
            {/* Ambient gradients */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />
                <div className="absolute bottom-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
                <div className="absolute top-[40%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
                <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                            Welcome to ShopNow
                        </div>

                        <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight md:text-6xl text-white">
                            Premium tech,{" "}
                            <span className="bg-gradient-to-r from-indigo-400 via-white to-fuchsia-300 bg-clip-text text-transparent">
                                engineered
                            </span>{" "}
                            for the future.
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                            Discover the latest smartphones, wearables, and accessories. Clean UI, fast checkout, and in-memory simulated catalogue — all in one modern storefront experience.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href="/products"
                                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-slate-950 transition hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] active:translate-y-0"
                            >
                                Explore Collection
                                <span className="transition group-hover:translate-x-0.5">→</span>
                            </Link>

                            <Link
                                href="/admin"
                                className="inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Partner Dashboard
                            </Link>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {STATS.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm"
                                >
                                    <div className="text-xl font-extrabold text-white">{s.value}</div>
                                    <div className="mt-1 text-xs text-slate-400">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (Phones mockup presentation) */}
                    <div className="relative">
                        <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-indigo-500/10 via-white/5 to-fuchsia-500/10 blur-2xl" />

                        <div className="relative grid grid-cols-2 gap-6">
                            <div className="translate-y-8">
                                <PhoneMockup
                                    src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=320&auto=format&fit=crop"
                                    alt="Phone UI Preview 1"
                                    priority
                                    badge="New"
                                />
                            </div>

                            <div className="-translate-y-2">
                                <PhoneMockup
                                    src="https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=320&auto=format&fit=crop"
                                    alt="Phone UI Preview 2"
                                    badge="Fast"
                                />
                            </div>

                            <div className="col-span-2 mx-auto w-[85%]">
                                <PhoneMockup
                                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=512&auto=format&fit=crop"
                                    alt="Phone UI Preview 3"
                                    badge="Pro"
                                    wide
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="relative z-10 border-t border-white/5 bg-slate-950/20 py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 block">
                                Handpicked Selections
                            </span>
                            <h2 className="text-3xl font-black text-white tracking-tighter md:text-4xl">
                                Featured <span className="text-gradient">Products</span>
                            </h2>
                        </div>
                        <Link
                            href="/products"
                            className="hidden md:inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                        >
                            View All Products →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featured.map((p: any) => (
                            <ProductCard key={p._id} p={p} />
                        ))}
                    </div>

                    <div className="mt-12 md:hidden text-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                        >
                            View All Products →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="relative z-10 border-t border-white/5 py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-black tracking-tighter text-white md:text-4xl">
                            Designed to impress.
                        </h2>
                        <p className="mt-3 text-base text-slate-400">
                            Experience smooth transitions, custom product mockups, and structured cards built with responsive CSS grid layout.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {FEATURES.map((f) => (
                            <div
                                key={f.title}
                                className="group rounded-3xl bg-white/5 border border-white/5 p-8 transition hover:bg-white/[0.08] hover:border-white/10"
                            >
                                <div className="mb-6 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/0 border border-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:text-white transition-colors">
                                    ✓
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                    {f.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}